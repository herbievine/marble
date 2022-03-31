import React from "react";

interface AuthFlowProps {
  prompt: string;
  placeholder: string;
  defaultValue: string;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  next?: () => void;
  back?: () => void;
}

const AuthFlow: React.FC<AuthFlowProps> = ({
  prompt,
  placeholder,
  defaultValue,
  onChange,
  error,
  next,
  back,
}) => {
  return (
    <div className="w-full flex flex-col justify-start items-center">
      <div className="w-full">
        <div className="flex justify-between items-center">
          <label htmlFor="input">{prompt}</label>
          {error && <p className="text-red-400">{error}</p>}
        </div>
        <input
          id="input"
          className="w-full mt-2 px-4 py-3 bg-neutral-900 border-2 border-neutral-200 rounded-lg"
          type="text"
          placeholder={placeholder}
          value={defaultValue}
          onChange={onChange}
        />
      </div>
      <div className="mt-12 w-full flex justify-between align-center">
        <button
          className={!back && "text-neutral-500"}
          disabled={!back}
          onClick={back}
        >
          Back
        </button>
        <button
          className={!next && "text-neutral-500"}
          disabled={!next}
          onClick={next}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AuthFlow;
