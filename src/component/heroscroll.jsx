"use client";
import React from "react";
import { ContainerScroll } from "@/component/ui/container-scroll-animation";
import Image from "next/image";
import headerimg from "@/assets/header.png";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden min-h-screen justify-center -mt-150">
      <ContainerScroll
      >
        <Image
          src={headerimg}
          alt="Outmail: Boost Your Job Visibility"
          width={1400}
          height={700}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
