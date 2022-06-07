--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.3 (Ubuntu 14.3-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: customer; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.customer (
    created_at timestamp with time zone DEFAULT now(),
    name text NOT NULL,
    email text,
    company text,
    address text,
    zip text,
    city text,
    country text,
    created_by uuid DEFAULT auth.uid(),
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL
);


ALTER TABLE public.customer OWNER TO supabase_admin;

--
-- Name: project; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.project (
    created_by uuid DEFAULT auth.uid(),
    customer uuid NOT NULL,
    name text NOT NULL,
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.project OWNER TO supabase_admin;

--
-- Name: task; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.task (
    project uuid NOT NULL,
    title text NOT NULL,
    description text,
    state public.task_state DEFAULT 'todo'::public.task_state NOT NULL,
    created_by uuid DEFAULT auth.uid(),
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    index bigint DEFAULT '0'::bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.task OWNER TO supabase_admin;

--
-- Name: customer customer_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (id);


--
-- Name: project project_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.project
    ADD CONSTRAINT project_pkey PRIMARY KEY (id);


--
-- Name: task task_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_pkey PRIMARY KEY (id);


--
-- Name: project on_delete_project; Type: TRIGGER; Schema: public; Owner: supabase_admin
--

CREATE TRIGGER on_delete_project BEFORE DELETE ON public.project FOR EACH ROW EXECUTE FUNCTION public.handle_delete_project();


--
-- Name: task on_insert_task; Type: TRIGGER; Schema: public; Owner: supabase_admin
--

CREATE TRIGGER on_insert_task AFTER INSERT ON public.task FOR EACH ROW EXECUTE FUNCTION public.handle_insert_task();


--
-- Name: task on_update_task; Type: TRIGGER; Schema: public; Owner: supabase_admin
--

CREATE TRIGGER on_update_task BEFORE UPDATE ON public.task FOR EACH ROW WHEN ((pg_trigger_depth() < 1)) EXECUTE FUNCTION public.handle_update_task();


--
-- Name: project project_customer_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.project
    ADD CONSTRAINT project_customer_fkey FOREIGN KEY (customer) REFERENCES public.customer(id);


--
-- Name: task task_project_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_project_fkey FOREIGN KEY (project) REFERENCES public.project(id);


--
-- Name: customer Enable delete for own entries only; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Enable delete for own entries only" ON public.customer FOR DELETE USING (((auth.role() = 'authenticated'::text) AND (auth.uid() = created_by)));


--
-- Name: project Enable delete for own entries only; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Enable delete for own entries only" ON public.project FOR DELETE USING (((auth.role() = 'authenticated'::text) AND (auth.uid() = created_by)));


--
-- Name: task Enable delete for own entries only; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Enable delete for own entries only" ON public.task FOR DELETE USING (((auth.role() = 'authenticated'::text) AND (auth.uid() = created_by)));


--
-- Name: customer Enable insert for authenticated users only; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Enable insert for authenticated users only" ON public.customer FOR INSERT WITH CHECK ((auth.role() = 'authenticated'::text));


--
-- Name: project Enable insert for authenticated users only; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Enable insert for authenticated users only" ON public.project FOR INSERT WITH CHECK ((auth.role() = 'authenticated'::text));


--
-- Name: task Enable insert for authenticated users only; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Enable insert for authenticated users only" ON public.task FOR INSERT WITH CHECK ((auth.role() = 'authenticated'::text));


--
-- Name: customer Enable select for own entries only; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Enable select for own entries only" ON public.customer FOR SELECT USING (((auth.role() = 'authenticated'::text) AND (auth.uid() = created_by)));


--
-- Name: project Enable select for own entries only; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Enable select for own entries only" ON public.project FOR SELECT USING (((auth.role() = 'authenticated'::text) AND (auth.uid() = created_by)));


--
-- Name: task Enable select for own entries only; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Enable select for own entries only" ON public.task FOR SELECT USING (((auth.role() = 'authenticated'::text) AND (auth.uid() = created_by)));


--
-- Name: customer Enable update for own entries only; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Enable update for own entries only" ON public.customer FOR UPDATE USING (((auth.role() = 'authenticated'::text) AND (auth.uid() = created_by)));


--
-- Name: project Enable update for own entries only; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Enable update for own entries only" ON public.project FOR UPDATE USING (((auth.role() = 'authenticated'::text) AND (auth.uid() = created_by)));


--
-- Name: task Enable update for own entries only; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Enable update for own entries only" ON public.task FOR UPDATE USING (((auth.role() = 'authenticated'::text) AND (auth.uid() = created_by)));


--
-- Name: customer; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE public.customer ENABLE ROW LEVEL SECURITY;

--
-- Name: project; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE public.project ENABLE ROW LEVEL SECURITY;

--
-- Name: task; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE public.task ENABLE ROW LEVEL SECURITY;

--
-- Name: TABLE customer; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.customer TO postgres;
GRANT ALL ON TABLE public.customer TO anon;
GRANT ALL ON TABLE public.customer TO authenticated;
GRANT ALL ON TABLE public.customer TO service_role;


--
-- Name: TABLE project; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.project TO postgres;
GRANT ALL ON TABLE public.project TO anon;
GRANT ALL ON TABLE public.project TO authenticated;
GRANT ALL ON TABLE public.project TO service_role;


--
-- Name: TABLE task; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.task TO postgres;
GRANT ALL ON TABLE public.task TO anon;
GRANT ALL ON TABLE public.task TO authenticated;
GRANT ALL ON TABLE public.task TO service_role;


--
-- PostgreSQL database dump complete
--

