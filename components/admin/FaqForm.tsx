"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const FaqEditor = ({
  setValue,
  data,
}: {
  setValue: any;
  data?: {
    question: string;
    answer: string;
    index: number;
  }[];
}) => {
  const [count, setCount] = useState(data ? data.length : 1);
  const [faqData, setFaqData] = useState(() => initializeFaqData(1));

  function initializeFaqData(count: number) {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        question: "",
        answer: "",
        index: i,
      });
    }
    return data ? data : arr;
  }

  const handleChange = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    setFaqData((prevFaqData) => {
      const newData = [...prevFaqData];
      const faqItem = newData.find((item) => item.index === index);
      if (faqItem) {
        faqItem[field] = value;
      }
      return newData;
    });
  };

  useEffect(() => {
    setValue("faq", JSON.stringify(faqData));
  }, [faqData, setValue]);

  const handleAddClick = () => {
    setCount(count + 1);
    setFaqData((prevFaqData) => [
      ...prevFaqData,
      { question: "", answer: "", index: count },
    ]);
  };

  const handleRemoveClick = () => {
    if (count > 1) {
      setCount(count - 1);
      setFaqData((prevFaqData) => prevFaqData.slice(0, count - 1));
    }
  };

  return (
    <div className="w-full flex flex-col items-start justify-start gap-y-4">
      <div className="flex items-center justify-between w-full mb-4 px-2">
        <h2 className="text-lg font-semibold">Add FAQ</h2>
        <div className="flex items-center justify-center gap-x-2 mt-2">
          <Button onClick={handleAddClick} type="button">
            Add + 1
          </Button>
          <Button
            variant={"destructive"}
            onClick={handleRemoveClick}
            disabled={count < 2}
            type="button"
          >
            Remove - 1
          </Button>
        </div>
      </div>
      {Array.from({ length: count }, (_, index) => index).map((l) => (
        <div
          key={l}
          className="flex flex-col items-start justify-start w-full gap-y-2"
        >
          <Input
            type="text"
            defaultValue={`${faqData[l].question}`}
            placeholder="Question"
            onChange={(e) => handleChange(l, "question", e.target.value)}
          />
          <Textarea
            placeholder="Answer"
            defaultValue={`${faqData[l].answer}`}
            onChange={(e) => handleChange(l, "answer", e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};
