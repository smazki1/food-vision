import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, ImageIcon } from "lucide-react";
import { FoodItem } from "@/types/food-vision";
import { FilePreviewGrid } from "../FilePreviewGrid";

interface CocktailItemProps {
  cocktail: FoodItem;
  index: number;
  onDelete: (id: string) => void;
  onChange: (id: string, field: keyof FoodItem, value: string) => void;
  onFileChange: (id: string, files: File[] | undefined) => void;
}

export const CocktailItem: React.FC<CocktailItemProps> = ({
  cocktail,
  index,
  onDelete,
  onChange,
  onFileChange,
}) => {
  const handleRemoveImage = (removeIdx: number) => {
    const newFiles =
      cocktail.referenceImages?.filter((_, idx) => idx !== removeIdx) || [];
    onFileChange(
      cocktail.id,
      newFiles.length ? newFiles : undefined
    );
  };

  return (
    <div className="p-4 border border-input rounded-md mb-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">קוקטייל {index + 1}</h3>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onDelete(cocktail.id)}
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4 ml-2" />
          הסר/י
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`cocktail-name-${cocktail.id}`}>שם הקוקטייל *</Label>
          <Input
            id={`cocktail-name-${cocktail.id}`}
            value={cocktail.name}
            onChange={(e) => onChange(cocktail.id, "name", e.target.value)}
            placeholder="הזן/י את שם הקוקטייל"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`cocktail-ingredients-${cocktail.id}`}>
            רשימת מרכיבים עיקריים *
          </Label>
          <Textarea
            id={`cocktail-ingredients-${cocktail.id}`}
            value={cocktail.ingredients}
            onChange={(e) => onChange(cocktail.id, "ingredients", e.target.value)}
            placeholder="הזן/י את המרכיבים העיקריים"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`cocktail-description-${cocktail.id}`}>
            תיאור קצר
          </Label>
          <Textarea
            id={`cocktail-description-${cocktail.id}`}
            value={cocktail.description}
            onChange={(e) => onChange(cocktail.id, "description", e.target.value)}
            placeholder="הזן/י תיאור קצר כולל מרכיבים (אופציונלי)"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`cocktail-notes-${cocktail.id}`}>
            הערות מיוחדות
          </Label>
          <Textarea
            id={`cocktail-notes-${cocktail.id}`}
            value={cocktail.notes}
            onChange={(e) => onChange(cocktail.id, "notes", e.target.value)}
            placeholder="הזן/י הערות מיוחדות"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`cocktail-image-${cocktail.id}`}>
            תמונת ייחוס
          </Label>
          <div className="flex items-center gap-2">
            <Input
              id={`cocktail-image-${cocktail.id}`}
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                const validFiles = files.filter(file => {
                  if (file.size > 5 * 1024 * 1024) {
                    alert("גודל הקובץ גדול מ-5MB");
                    return false;
                  }
                  return true;
                });
                onFileChange(
                  cocktail.id,
                  validFiles.length > 0 ? validFiles : undefined
                );
              }}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                document.getElementById(
                  `cocktail-image-${cocktail.id}`
                )?.click();
              }}
            >
              <ImageIcon className="h-4 w-4 ml-2" />
              {cocktail.referenceImages?.length
                ? "החלף/י תמונות"
                : "העלה/י תמונות"}
            </Button>
            {cocktail.referenceImages?.length && (
              <span className="text-sm text-muted-foreground">
                {cocktail.referenceImages.length} תמונות נבחרו
              </span>
            )}
          </div>
          <FilePreviewGrid
            files={cocktail.referenceImages || []}
            onRemove={handleRemoveImage}
          />
          <p className="text-xs text-muted-foreground">
            מקסימום 5MB, עד 4 תמונות בפורמט תמונה
          </p>
        </div>
      </div>
    </div>
  );
};
