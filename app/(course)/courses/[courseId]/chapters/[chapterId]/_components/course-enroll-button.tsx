"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { formatPrice, convertGhsToUsd } from "@/lib/format";

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
}

export const CourseEnrollButton = ({
  price,
  courseId,
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const priceInUsd = convertGhsToUsd(price);

  const onClick = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(`/api/courses/${courseId}/checkout`)

      window.location.assign(response.data.url);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        onClick={onClick}
        disabled={isLoading}
        size="sm"
        className="w-full md:w-auto"
      >
        Enroll for {formatPrice(price)}
      </Button>
      <p className="text-xs text-muted-foreground">
        ≈ ${priceInUsd.toFixed(2)} USD
      </p>
    </div>
  )
}