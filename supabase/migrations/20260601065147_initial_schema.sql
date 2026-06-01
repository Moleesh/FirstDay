-- FirstDay schema for Supabase-managed PostgreSQL.
create type public.recruiter_role as enum ('ADMIN', 'RECRUITER');
create type public.joinee_status as enum ('PENDING', 'IN_PROGRESS', 'COMPLETED');
create type public.field_type as enum ('TEXT', 'MULTISELECT', 'BULLET');

create table public.organisations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table public.recruiters (
  id uuid primary key default gen_random_uuid(),
  supabase_user_id uuid not null unique references auth.users(id) on delete cascade,
  email text not null unique,
  role public.recruiter_role not null default 'RECRUITER',
  org_id uuid not null references public.organisations(id),
  created_at timestamptz not null default now()
);

create table public.document_templates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  version integer not null default 1,
  org_id uuid not null references public.organisations(id),
  recruiter_id uuid not null references public.recruiters(id),
  created_at timestamptz not null default now(),
  archived_at timestamptz
);

create table public.joinees (
  id uuid primary key default gen_random_uuid(),
  display_id text not null unique,
  org_id uuid not null references public.organisations(id),
  recruiter_id uuid not null references public.recruiters(id),
  import_batch_id text,
  status public.joinee_status not null default 'PENDING',
  template_id uuid not null references public.document_templates(id),
  access_code_hash text not null,
  created_at timestamptz not null default now()
);

create table public.mandatory_docs (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  template_id uuid not null references public.document_templates(id) on delete cascade
);

create table public.template_fields (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  field_type public.field_type not null,
  default_value text,
  required boolean not null default true,
  skip_note text,
  "order" integer not null,
  template_id uuid not null references public.document_templates(id) on delete cascade
);

create table public.template_pages (
  id uuid primary key default gen_random_uuid(),
  "order" integer not null,
  source_url text not null,
  template_id uuid not null references public.document_templates(id) on delete cascade
);

create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  joinee_id uuid not null unique references public.joinees(id) on delete cascade,
  field_values jsonb not null default '{}'::jsonb,
  signature_url text,
  signed_pdf_url text,
  unsigned_pdf_url text,
  ip_address text not null,
  signed_at timestamptz,
  consent_given boolean not null default false,
  completed_at timestamptz
);

create table public.uploaded_docs (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  storage_url text not null,
  submission_id uuid not null references public.submissions(id) on delete cascade,
  uploaded_at timestamptz not null default now()
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  recruiter_id uuid references public.recruiters(id),
  action text not null,
  entity_type text not null,
  entity_id text not null,
  metadata jsonb,
  created_at timestamptz not null default now()
);

alter table public.organisations enable row level security;
alter table public.recruiters enable row level security;
alter table public.document_templates enable row level security;
alter table public.joinees enable row level security;
alter table public.mandatory_docs enable row level security;
alter table public.template_fields enable row level security;
alter table public.template_pages enable row level security;
alter table public.submissions enable row level security;
alter table public.uploaded_docs enable row level security;
alter table public.audit_logs enable row level security;;
