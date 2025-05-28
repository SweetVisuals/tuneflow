"use client"

import { type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { ChevronRightIcon } from "@radix-ui/react-icons"

type NavItem = {
  title: string
  url?: string
  icon?: LucideIcon
  isActive?: boolean
  onClick?: () => void
  items?: NavItem[]
  isGroup?: boolean
}

export function NavMain({
  items,
}: {
  items: NavItem[]
}) {
  return (
    <>
      {items.map((group) => (
        <SidebarGroup key={group.title}>
          {group.isGroup ? (
            <Collapsible defaultOpen>
              <SidebarGroupLabel className="flex items-center justify-between">
                <span>{group.title}</span>
                <CollapsibleTrigger asChild>
                  <button className="p-1 rounded hover:bg-accent">
                    <ChevronRightIcon className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-90" />
                  </button>
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarMenu>
                  {group.items?.map((item) => (
                    <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip={item.title}>
                          <button 
                            onClick={item.onClick}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors hover:text-primary"
                          >
                            {item.icon && <item.icon className="h-4 w-4" />}
                            <span>{item.title}</span>
                          </button>
                        </SidebarMenuButton>
                        {item.items?.length ? (
                          <>
                            <CollapsibleTrigger asChild>
                              <SidebarMenuAction className="transition-transform duration-200 data-[state=open]:rotate-90">
                                <ChevronRightIcon />
                                <span className="sr-only">Toggle</span>
                              </SidebarMenuAction>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <SidebarMenuSub>
                                {item.items?.map((subItem) => (
                                  <SidebarMenuSubItem key={subItem.title}>
                                    <SidebarMenuSubButton asChild>
                                      <a href={subItem.url}>
                                        <span>{subItem.title}</span>
                                      </a>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                ))}
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          </>
                        ) : null}
                      </SidebarMenuItem>
                    </Collapsible>
                  ))}
                </SidebarMenu>
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <SidebarMenu>
              {group.items?.map((item) => (
                <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <button 
                        onClick={item.onClick}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors hover:text-primary"
                      >
                        {item.icon && <item.icon className="h-4 w-4" />}
                        <span>{item.title}</span>
                      </button>
                    </SidebarMenuButton>
                    {item.items?.length && (
                      <>
                        <CollapsibleTrigger asChild>
                              <SidebarMenuAction className="transition-transform duration-200 data-[state=open]:rotate-90">
                            <ChevronRightIcon />
                            <span className="sr-only">Toggle</span>
                          </SidebarMenuAction>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                  <a href={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          )}
        </SidebarGroup>
      ))}
    </>
  )
}
