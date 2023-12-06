import React from "react";
import { IItem } from "@/types";
import AnimatedNumber from "../../layouts/shortcodes/AnimatedNumber";
import DynamicIcon from "../helpers/DynamicIcon";

interface NumberElementsProps {
  numbers: IItem[];
}

const NumberElements: React.FC<NumberElementsProps> = ({ numbers }) => {
  return (
    <section className={`section-sm ${"bg-gradient"}`}>
      <div className="container">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
            {numbers.map((item: IItem, index: number) => (
              <div key={index}>
                <div className="number-icons">
                  <a
                    aria-label={item.name}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    <span className="sr-only">{item.name}</span>
                    <DynamicIcon className="inline-block" icon={item.icon} />
                  </a>
                </div>
                <div className="flex flex-col">
                  <p className="text-3xl text-black-600 font-bold mt-3">
                    <AnimatedNumber
                      number={parseInt(item.number, 10)}
                      preSymbol={item.preSymbol}
                      postSymbol={item.postSymbol}
                    />
                  </p>
                  <p className="text-lg text-black-500 ">{item.text}</p>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default NumberElements;
