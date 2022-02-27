import { SupabaseClient } from "@supabase/supabase-js";
import React, { useState } from "react";
import { supabase } from "../../lib/supabase";
import { CreateCustomerFormView } from "./view";

export const CreateCustomerForm = () => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Form state
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from("customer")
        .insert({ company, name, email, address, zip, city, country });
      if (error) throw error;
      alert("Created!");
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };
  return (
    <CreateCustomerFormView
      isOpen={isOpen}
      loading={loading}
      onOpen={() => setIsOpen(!isOpen)}
      company={company}
      setCompany={setCompany}
      name={name}
      setName={setName}
      email={email}
      setEmail={setEmail}
      address={address}
      setAddress={setAddress}
      zip={zip}
      setZip={setZip}
      city={city}
      setCity={setCity}
      country={country}
      setCountry={setCountry}
      onSubmit={handleSubmit}
    />
  );
};
