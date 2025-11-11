-- Create table to store ping results from cronpings
-- Run this in Supabase SQL editor (DO NOT store secrets here)

CREATE TABLE public.ping_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  endpoint_id UUID REFERENCES public.endpoints(id) ON DELETE SET NULL,
  user_id TEXT,
  name TEXT,
  url TEXT,
  status TEXT,
  status_code INTEGER,
  response_time INTEGER,
  error TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ping_logs_endpoint_id ON public.ping_logs(endpoint_id);
CREATE INDEX IF NOT EXISTS idx_ping_logs_created_at ON public.ping_logs(created_at);
