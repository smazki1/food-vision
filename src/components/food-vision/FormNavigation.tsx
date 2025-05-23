import React from "react";
import { Button } from "@/components/ui/button";
interface FormNavigationProps {
  activeTab: string;
  onNext: () => void;
  onPrev: () => void;
  isLastTab: boolean;
  onSubmit: () => void;
  isSubmitting: boolean;
}
const FormNavigation: React.FC<FormNavigationProps> = ({
  activeTab,
  onNext,
  onPrev,
  isLastTab,
  onSubmit,
  isSubmitting
}) => {
  return <div className="mt-8 flex justify-between py-0 px-[200px]">
      {activeTab !== "client" && <Button type="button" variant="outline" onClick={onPrev}>
          הקודם
        </Button>}
      
      {!isLastTab ? <Button type="button" className="bg-[#F3752B] hover:bg-[#F3752B]/90 mr-auto" onClick={onNext}>
          הבא
        </Button> : <Button type="button" className="bg-[#F3752B] hover:bg-[#F3752B]/90 mr-auto" onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? "שולח..." : "שלח טופס"}
        </Button>}
    </div>;
};
export default FormNavigation;