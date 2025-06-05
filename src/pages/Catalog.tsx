import React from "react";
import { Button } from "@/components/ui/button";

const Catalog: React.FC = () => (
  <div dir="rtl" className="min-h-screen flex items-center justify-center bg-background">
    <Button asChild className="bg-[#F3752B] hover:bg-[#F3752B]/90">
      <a href="https://app.food-vision.co.il/">קבלו 3 תמונות בחינם</a>
    </Button>
  </div>
);

export default Catalog;
