import React from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { route } from "ziggy-js"

export default function Categories() {

  return (
    <div>
      <div className="border-b-1 w-full h-12">
        <div className="w-full h-full px-4 flex justify-start items-center">
          <Breadcrumb
            items={[
              {
                title: <a href={route('admin.dashboard')}>Dashboard</a>,
              },
              {
                title: <a href={route('admin.categories')}>Categories</a>,
              },
            ]}
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={route('admin.dashboard')}>Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={route('admin.categories')}>Categories</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <div className="container mx-auto p-4">
        <div className="w-full h-full flex justify-center items-center p-4">

        </div>
      </div>
    </div>
  )
}