begin;

create table public.motionly_enquiries (
  id uuid primary key,
  submitted_at timestamptz not null default now(),
  status text not null default 'new' check (status in ('new', 'reviewed', 'closed')),
  name text not null check (length(name) between 1 and 100),
  email text not null check (length(email) between 3 and 254),
  business text not null check (length(business) between 1 and 160),
  website text,
  service text not null check (service in ('ai-promotional-videos', 'social-media-content', 'seasonal-marketing-campaigns', 'unsure')),
  details text not null check (length(details) between 10 and 3000),
  timeline text,
  budget text,
  source text not null check (source in ('contact', 'brand-discovery'))
);

create table public.motionly_enquiry_limits (
  rate_key text not null,
  bucket timestamptz not null,
  submissions smallint not null check (submissions between 1 and 5),
  primary key (rate_key, bucket)
);

create index motionly_enquiry_limits_bucket on public.motionly_enquiry_limits (bucket);

alter table public.motionly_enquiries enable row level security;
alter table public.motionly_enquiry_limits enable row level security;
revoke all on public.motionly_enquiries, public.motionly_enquiry_limits from public, anon, authenticated;
grant select, insert on public.motionly_enquiries to service_role;

create function public.submit_motionly_enquiry(rate_key text, enquiry jsonb)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  enquiry_id uuid := (enquiry->>'id')::uuid;
  window_start timestamptz := date_trunc('hour', now());
  attempt_count smallint;
begin
  perform pg_advisory_xact_lock(hashtext(enquiry_id::text)::bigint);
  if exists (select 1 from public.motionly_enquiries where id = enquiry_id) then
    return 'saved';
  end if;

  delete from public.motionly_enquiry_limits where bucket < window_start - interval '24 hours';
  insert into public.motionly_enquiry_limits as limits (rate_key, bucket, submissions)
  values ($1, window_start, 1)
  on conflict on constraint motionly_enquiry_limits_pkey do update
    set submissions = limits.submissions + 1
    where limits.submissions < 5
  returning submissions into attempt_count;

  if attempt_count is null then
    return 'rate-limited';
  end if;

  insert into public.motionly_enquiries (id, name, email, business, website, service, details, timeline, budget, source)
  values (enquiry_id, enquiry->>'name', enquiry->>'email', enquiry->>'business', enquiry->>'website', enquiry->>'service',
    enquiry->>'details', enquiry->>'timeline', enquiry->>'budget', enquiry->>'source');
  return 'saved';
end;
$$;

revoke execute on function public.submit_motionly_enquiry(text, jsonb) from public, anon, authenticated;
grant execute on function public.submit_motionly_enquiry(text, jsonb) to service_role;

commit;
