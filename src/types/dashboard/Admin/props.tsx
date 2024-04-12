export interface AdminDropdownInputWithLabelProps {
  handleSlectedReviewerChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  selectedReviewerId: string;
}

export interface AssesmentViewProps {
  onClose: () => void;
  paperAssesment: any;
}