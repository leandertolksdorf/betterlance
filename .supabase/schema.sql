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

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: email; Type: DOMAIN; Schema: public; Owner: supabase_admin
--

CREATE DOMAIN public.email AS public.citext
	CONSTRAINT email_check CHECK ((VALUE OPERATOR(public.~) '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$'::public.citext));


ALTER DOMAIN public.email OWNER TO supabase_admin;

--
-- Name: task_state; Type: TYPE; Schema: public; Owner: supabase_admin
--

CREATE TYPE public.task_state AS ENUM (
    'todo',
    'in_progress',
    'done',
    'archived'
);


ALTER TYPE public.task_state OWNER TO supabase_admin;

--
-- Name: handle_delete_project(); Type: FUNCTION; Schema: public; Owner: supabase_admin
--

CREATE FUNCTION public.handle_delete_project() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
  DELETE FROM public.task
  WHERE project = old.id;
  RETURN old;
END;
$$;


ALTER FUNCTION public.handle_delete_project() OWNER TO supabase_admin;

--
-- Name: handle_insert_task(); Type: FUNCTION; Schema: public; Owner: supabase_admin
--

CREATE FUNCTION public.handle_insert_task() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
  UPDATE public.task
  SET index = index + 1
  WHERE 
    (id != new.id)
    AND
    (state = new.state)
    AND 
    (project = new.project);
  RETURN new;
END;
$$;


ALTER FUNCTION public.handle_insert_task() OWNER TO supabase_admin;

--
-- Name: handle_update_task(); Type: FUNCTION; Schema: public; Owner: supabase_admin
--

CREATE FUNCTION public.handle_update_task() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
  IF new.state != old.state THEN
    -- state has changed

    -- increment task indexes in the destination state
    UPDATE public.task
    SET index = index + 1
    WHERE 
      (id != new.id)
      AND
      (index >= new.index)
      AND
      (state = new.state);

    -- decrement task indexes in the source state
    UPDATE public.task
    SET index = index - 1
    WHERE 
      (id != new.id)
      AND
      (index > old.index)
      AND
      (state = old.state);
  ELSE
    -- state has not changed
    IF new.index < old.index THEN
      UPDATE public.task
      SET index = index + 1
      WHERE 
        (id != new.id)
        AND
        (index < old.index)
        AND 
        (index >= new.index)
        AND
        (state = new.state);
    END IF;
    IF new.index > old.index THEN
      UPDATE public.task
      SET index = index - 1
      WHERE 
        (id != new.id)
        AND
        (index <= new.index)
        AND 
        (index > old.index)
        AND
        (state = new.state);
    END IF;
  END IF;
  RETURN new;
END;
$$;


ALTER FUNCTION public.handle_update_task() OWNER TO supabase_admin;

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
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;


--
-- Name: FUNCTION handle_delete_project(); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.handle_delete_project() TO postgres;
GRANT ALL ON FUNCTION public.handle_delete_project() TO anon;
GRANT ALL ON FUNCTION public.handle_delete_project() TO authenticated;
GRANT ALL ON FUNCTION public.handle_delete_project() TO service_role;


--
-- Name: FUNCTION handle_insert_task(); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.handle_insert_task() TO postgres;
GRANT ALL ON FUNCTION public.handle_insert_task() TO anon;
GRANT ALL ON FUNCTION public.handle_insert_task() TO authenticated;
GRANT ALL ON FUNCTION public.handle_insert_task() TO service_role;


--
-- Name: FUNCTION handle_update_task(); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.handle_update_task() TO postgres;
GRANT ALL ON FUNCTION public.handle_update_task() TO anon;
GRANT ALL ON FUNCTION public.handle_update_task() TO authenticated;
GRANT ALL ON FUNCTION public.handle_update_task() TO service_role;


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
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES  TO service_role;


--
-- PostgreSQL database dump complete
--

