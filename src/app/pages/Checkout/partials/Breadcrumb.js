import React from "react";
import { useNavigate } from "react-router-dom";

export default function Breadcrumb({ steps, currentStep }) {
  const navigate = useNavigate();

  return (
    <nav className="text-sm font-medium text-gray-600 flex space-x-4">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <span
            onClick={() =>
              step.path && currentStep >= step.index && navigate(step.path)
            }
            className={`cursor-pointer ${
              currentStep === step.index ? "text-blue-500" : ""
            } ${step.path && currentStep >= step.index ? "hover:text-blue-700" : "text-gray-400 cursor-not-allowed"}`}
            role={step.path ? "link" : "none"} // Improve accessibility
            aria-current={currentStep === step.index ? "page" : undefined} // Improve accessibility
          >
            {step.label}
          </span>
          {index < steps.length - 1 && (
            <span className="mx-2 text-gray-500">&gt;</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
