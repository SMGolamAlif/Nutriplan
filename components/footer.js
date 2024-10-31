import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white rounded-lg">
      <div className="container mx-auto px-6 md:px-12 py-10">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="flex flex-col">
            <h2 className="text-3xl font-extrabold mb-3 text-green-400">
              NutriPlan
            </h2>
            <p className="text-gray-300 mb-5">
              AI-powered nutrition intelligence for personalized health
              transformation.
            </p>
            <div className="flex space-x-5">
              {[
                { icon: Facebook, href: "https://facebook.com/nutriplan" },
                { icon: Twitter, href: "https://twitter.com/nutriplan" },
                { icon: Instagram, href: "https://instagram.com/nutriplan" },
                {
                  icon: Linkedin,
                  href: "https://linkedin.com/company/nutriplan",
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-green-400 transition duration-200"
                >
                  <social.icon size={28} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Quick Links</h3>
            {[
              { name: "About Us", href: "/" },
              { name: "Features", href: "/" },
              { name: "Pricing", href: "/" },
              { name: "Contact", href: "/" },
            ].map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="block text-gray-400 hover:text-green-400 mb-2 transition duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Legal</h3>
            {[
              { name: "Terms of Service", href: "/terms" },
              { name: "Privacy Policy", href: "/privacy" },
              { name: "Cookies Policy", href: "/cookies" },
            ].map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="block text-gray-400 hover:text-green-400 mb-2 transition duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Contact</h3>
            <p className="text-gray-400 mb-2">support@nutriplan.ai</p>
            <p className="text-gray-400 mb-2">+880 (01) NUTRIPLAN</p>
          </div>
        </div>

        <Separator className="my-10 bg-gray-700" />

        <div className="text-center text-gray-400 text-sm">
          &copy; {currentYear} NutriPlan. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
