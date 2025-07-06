
-- Remove unused KYC fields that were added incorrectly
ALTER TABLE form_submissions 
DROP COLUMN IF EXISTS kyc_net_worth,
DROP COLUMN IF EXISTS kyc_investment_experience,
DROP COLUMN IF EXISTS kyc_risk_tolerance,
DROP COLUMN IF EXISTS kyc_investment_objectives;

-- The correct KYC fields that should remain are:
-- kyc_full_name, kyc_id_number, kyc_date_of_birth, kyc_nationality, 
-- kyc_address, kyc_occupation, kyc_employer, kyc_income_source

-- The custodian fields are correct as they are:
-- custodian_name, custodian_contact, custodian_registration, 
-- custodian_address, custodian_services

-- The issuer fields are correct as they are:
-- issuer_entity_name, issuer_jurisdiction, issuer_contact_person,
-- issuer_contact_info, issuer_address, issuer_business_type,
-- issuer_registration_number
