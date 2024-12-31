import Link from "next/link";
import Image from "next/image";

const menuItems = [
    {
        title: "MENU",
        items: [
            {
                icon: "/home.png",
                label: "Admin",
                href: "/admin",
                visible: ["admin", "teacher", "student", "parent"],
            },
            {
                icon: "/teacher.png",
                label: "Clientes",
                href: "/list/clientes",
                visible: ["admin", "teacher"],
            },
            {
                icon: "/student.png",
                label: "Empresas",
                href: "/list/empresas",
                visible: ["admin", "teacher"],
            },
            {
                icon: "/subject.png",
                label: "Declaraciones",
                href: "/list/subjects",
                visible: ["admin"],
            },
        ],
    },
    {
        title: "OTROS",
        items: [
            {
                icon: "/profile.png",
                label: "Profile",
                href: "/profile",
                visible: ["admin", "teacher", "student", "parent"],
            },
            {
                icon: "/setting.png",
                label: "Settings",
                href: "/settings",
                visible: ["admin", "teacher", "student", "parent"],
            },
            {
                icon: "/logout.png",
                label: "Logout",
                href: "/logout",
                visible: ["admin", "teacher", "student", "parent"],
            },
        ],
    },
];

const Menu = () => {
    return (
      <div className="mt-4 text-sm">
        {menuItems.map((item) => (
          <div className="flex flex-col gap-2" key={item.title}>
            <span className="hidden lg:block text-gray-400 font-light my-4">{item.title}</span>
            {item.items.map((i) => (
              <Link 
                href={i.href} 
                key={i.href} 
                className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLite">
                <Image
                  src={i.icon}
                  alt={`${i.label} icon`}
                  width={20}
                  height={20}
                  priority
                />
                <span className="hidden lg:block">{i.label}</span>
              </Link>
            ))}
          </div>
        ))}
      </div>
    );
  };

export default Menu;