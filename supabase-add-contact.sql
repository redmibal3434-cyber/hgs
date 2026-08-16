alter table transactions
add column if not exists full_name text,
add column if not exists phone text;
