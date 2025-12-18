"use client"
import React from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ChartPieInteractive } from "./pie-charts"
import { SectionCards } from "./section-cards"
import { ChartLineMultiple } from "./chart-line-multiple"
import { ChartAreaInteractive } from "./area-chart"

export default function Page() {

  return (
    <>
      <div className="hidden px-2 pb-4 text-2xl font-semibold">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">
                Building Your Application
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Data Fetching</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 md:gap-6 py-4 md:py-6">
          <SectionCards />
        </div>
      </div>
      <div className="grid auto-rows-min gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-6">
        <ChartPieInteractive />
        <ChartPieInteractive />
        <ChartLineMultiple />
        <ChartLineMultiple />
      </div>
      <div className="grid auto-rows-min md:grid-cols-1 p-6">
        <ChartAreaInteractive />
      </div>
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    </>
  )
}
