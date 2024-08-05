"use client"
import React from 'react'
import { CircleDollarSign, Icon, LucideIcon, Menu, SlidersHorizontal, Clipboard, Archive, User } from 'lucide-react'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/app/redux'
import { setIsDarkMode, setIsSidebarCollapsed } from '@/state'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Layout } from 'lucide-react'

interface SidebarLinkProps  {
    href: string,
    icon: LucideIcon,
    label: string,
    isCollapsed: boolean
}

const SidebarLink = ({
    href,
    icon: Icon,
    label,
    isCollapsed
}: SidebarLinkProps) => {

    const pathname = usePathname()
    const isActive = pathname === href || (pathname === "/" && href === "/dashboard")

    return (
        <Link href={href}>
            <div className={`cursor-pinter flex items-center ${isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"} hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${isActive ? "bg-blue-200 text-white" : ""}`}>
                <Icon className="w-6 h-6 !text-gray-700" />
                <span className={`${isCollapsed ? "hidden" : "block"} font-medium text-gray-700`}>
                    {label}
                </span>
            </div>
        </Link>
    )

}

const Sidebar = () => {

    const dispatch = useAppDispatch()
    const isSidebarCollapsed = useAppSelector(
        (state) => state.global.isSidebarCollapsed
    )
    const isDarkMode = useAppSelector(
        (state) => state.global.isDarkMode
    )

    const toggleSidebar = () => {
        dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))
    }

    const sidebarClassName = `fixed flex flex-col ${isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"} bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`

    return (
        <div className={sidebarClassName}>
            {/* TOP LOGO */}
            <div className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${isSidebarCollapsed ? "px-5" : "px-8"}`}>
                {
                    isSidebarCollapsed
                        ? <Image src="https://s3-invetorio.s3.eu-west-3.amazonaws.com/logo-sm.png" alt="" height={21} width={21} />
                        : <Image src={!isDarkMode ? "https://s3-invetorio.s3.eu-west-3.amazonaws.com/logo-light.png" : "https://s3-invetorio.s3.eu-west-3.amazonaws.com/logo-dark.png"} alt='' width={164} height={0}/>
                }

                <button className='md:hidden px-3 py-3 rounded-full bg-gray-100 hover-blue-100' onClick={toggleSidebar}>
                    <Menu className="w-4 h-4" />
                </button>
            </div>

            {/* LINK */}

            <div className="flex-grow mt-8">
                <SidebarLink href="/dashboard" icon={Layout} label="Dashboard" isCollapsed={isSidebarCollapsed} />
                <SidebarLink href="/inventory" icon={Archive} label="Inventory" isCollapsed={isSidebarCollapsed} />
                <SidebarLink href="/products" icon={Clipboard} label="Products" isCollapsed={isSidebarCollapsed} />
                <SidebarLink href="/users" icon={User} label="Users" isCollapsed={isSidebarCollapsed} />
                <SidebarLink href="/settings" icon={SlidersHorizontal} label="Settings" isCollapsed={isSidebarCollapsed} />
                <SidebarLink href="/expenses" icon={CircleDollarSign} label="Expenses" isCollapsed={isSidebarCollapsed} />
            </div>

            {/* FOOTER */}
            <div className={`${isSidebarCollapsed ? "hidden" : "block mb-10"}`}>
                <p className="text-center text-xs text-gray-500">
                    &copy; 2024 Invetorio by <Link className="cursor-pointer underline text-blue-500" href="https://github.com/khairallah17">khairallah</Link>
                </p>
            </div>

        </div>
    )
}

export default Sidebar