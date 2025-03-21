"use client";

import { getUrl } from "@/utils/api";
import dayjs from "dayjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Form, { HookFormProps } from "../form";
import useCompleteAccountApi from "./api";
import { AccountSetupPayload } from "./api/types";
import field from "./forms/fields";
import useIdentitySection from "./forms/identity";
import useOccupationSection from "./forms/occupation";
import usePersonalInformationSection from "./forms/personal-information";

export type CompleteAccountSectionProps = {
  hookForm: HookFormProps;
  onPrevClick?: () => void;
  onNextClick?: () => void;
};

const CompleteAccount = () => {
  const [activeTab, setActiveTab] = useState(0);

  const { ...hookForm } = useForm();
  const { ...occupationHookForm } = useForm();
  const { ...identityHookForm } = useForm({ mode: "onChange" });

  const { completeAccount } = useCompleteAccountApi();

  const goForward = () => setActiveTab(activeTab + 1);
  const goBack = () => setActiveTab(activeTab - 1);

  const { form: personalInfoSection } = usePersonalInformationSection({
    hookForm: hookForm,
    onNextClick: () => goForward(),
  });
  const { form: occupationSection } = useOccupationSection({
    hookForm: occupationHookForm,
    onPrevClick: () => goBack(),
    onNextClick: () => goForward(),
  });
  const { form: identitySection } = useIdentitySection({
    hookForm: identityHookForm,
    onPrevClick: () => goBack(),
    onNextClick: async () => {
      const getValue = hookForm.getValues;
      const getValue1 = occupationHookForm.getValues;
      const getValue2 = identityHookForm.getValues;

      const picture = await getUrl(getValue(field.picture.label));
      const identityProof =
        getValue2(field.identificationNumber.label) ??
        (await getUrl(getValue2(field.identificationUpload.label)));

      const personalInfo = {
        localGovernment: getValue(field.lga.label),
        dateOfBirth: dayjs(getValue(field.dateOfBirth.label)).toISOString(),
        homeAddress: getValue(field.homeAddress.label),
        maritalStatus: getValue(field.martialStatus.label),
        phoneNumber: getValue(field.phoneNumber.label),
        picture: picture,
      };

      const occupation = {
        employementStatus: getValue1(field.employmentStatus.label),
        natureOfJob: getValue1(field.natureOfJob.label),
        annualIncome: getValue1(field.annualIncome.label),
        employerName: getValue1(field.employerName.label),
        employerPhoneNumber: getValue1(field.employerName.label),
        employerAddress: getValue1(field.employerAddress.label),
      };

      const identity = {
        name: getValue2(field.meansOfIdentification.label),
        number: identityProof,
      };

      const payload: AccountSetupPayload = {
        ...personalInfo,
        ...occupation,
        ...identity,
      };

      completeAccount.mutateAsync(payload);
    },
  });

  return [personalInfoSection, occupationSection, identitySection].map(
    (section, index) => (
      <div
        key={index}
        className={`${activeTab === index ? "block" : "hidden"}`}
      >
        <Form {...section} />
      </div>
    )
  );
};

export default CompleteAccount;
