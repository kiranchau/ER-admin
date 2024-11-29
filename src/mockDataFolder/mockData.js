import * as AiIcons from 'react-icons/ai';
import * as HiIcons from 'react-icons/hi';
import * as PiIcons from 'react-icons/pi';
import * as VscIcons from 'react-icons/vsc';
import * as LuIcons from 'react-icons/lu';
import * as MdIcons from 'react-icons/md';
import * as TbIcons from 'react-icons/tb';
import * as LiaIcons from 'react-icons/lia';
import * as SlIcons from 'react-icons/sl';
import * as CgIcons from 'react-icons/cg';
import * as RiIcons from 'react-icons/ri'


export const menuItems = [
  { name: "Home", to: '/home', exact: true, icon: <VscIcons.VscHome title="Home" /> },
  { name: "Customer", to: '/customer', exact: true, icon: <MdIcons.MdPeopleOutline  title="Customer" /> },
  { name: "User", to: '/user', icon: <HiIcons.HiOutlineUser title="User List" /> },
  // { name: "Reports", to: '/reports', exact: true, icon: <CgIcons.CgFileDocument /> },
  // { name: "Connections", to: '/connections', icon: <VscIcons.VscDebugDisconnect /> },
  { name: "Master Data", to: '/masterdata', exact: true, icon: <PiIcons.PiDatabase title="Master Data"  /> },
]