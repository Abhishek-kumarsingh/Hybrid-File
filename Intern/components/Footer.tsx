import {
  FaLocationArrow,
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa6";
import { socialMedia } from "@/data";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="w-full bg-green-500/5 dark:bg-gray-800/30 border-t border-border"
      id="contact"
    >
      {/* Main footer content */}
      <div className="container-section">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: About DDA */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.png"
                alt="DDA Logo"
                width={48}
                height={48}
                className="object-contain"
              />
              <h3 className="text-lg font-semibold">
                Delhi Development Authority
              </h3>
            </div>
            <p className="text-muted-foreground mb-4">
              The Delhi Development Authority is responsible for the development
              and maintenance of parks, gardens, and green spaces throughout
              Delhi, enhancing the quality of life for residents.
            </p>
            <div className="flex space-x-3">
              {socialMedia.map((info) => (
                <Link
                  key={info.id}
                  href={info.link || "#"}
                  className="w-10 h-10 flex justify-center items-center rounded-full bg-dda-DEFAULT/10 hover:bg-dda-DEFAULT/20 transition-colors duration-200"
                >
                  <Image
                    src={info.img}
                    alt={"social media"}
                    width={20}
                    height={20}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-foreground hover:text-dda-DEFAULT transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-foreground hover:text-dda-DEFAULT transition-colors duration-200"
                >
                  About DDA
                </Link>
              </li>
              <li>
                <Link
                  href="/parks/national"
                  className="text-foreground hover:text-dda-DEFAULT transition-colors duration-200"
                >
                  National Parks
                </Link>
              </li>
              <li>
                <Link
                  href="/parks/state"
                  className="text-foreground hover:text-dda-DEFAULT transition-colors duration-200"
                >
                  State Parks
                </Link>
              </li>
              <li>
                <Link
                  href="/parks/local"
                  className="text-foreground hover:text-dda-DEFAULT transition-colors duration-200"
                >
                  Local Parks
                </Link>
              </li>
              <li>
                <Link
                  href="/nursery"
                  className="text-foreground hover:text-dda-DEFAULT transition-colors duration-200"
                >
                  Nursery
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services/park-maintenance"
                  className="text-foreground hover:text-dda-DEFAULT transition-colors duration-200"
                >
                  Park Maintenance
                </Link>
              </li>
              <li>
                <Link
                  href="/services/tree-plantation"
                  className="text-foreground hover:text-dda-DEFAULT transition-colors duration-200"
                >
                  Tree Plantation
                </Link>
              </li>
              <li>
                <Link
                  href="/services/garden-development"
                  className="text-foreground hover:text-dda-DEFAULT transition-colors duration-200"
                >
                  Garden Development
                </Link>
              </li>
              <li>
                <Link
                  href="/services/environmental-conservation"
                  className="text-foreground hover:text-dda-DEFAULT transition-colors duration-200"
                >
                  Environmental Conservation
                </Link>
              </li>
              <li>
                <Link
                  href="/services/community-programs"
                  className="text-foreground hover:text-dda-DEFAULT transition-colors duration-200"
                >
                  Community Programs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaLocationArrow className="text-dda-DEFAULT mt-1 flex-shrink-0" />
                <span>Vikas Sadan, INA, New Delhi, Delhi 110023, India</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-dda-DEFAULT flex-shrink-0" />
                <span>+91-11-24661599</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-dda-DEFAULT flex-shrink-0" />
                <span>info@dda.org.in</span>
              </li>
            </ul>

            <div className="mt-6">
              <Link href="/contact">
                <button className="btn-primary">Contact Us</button>
              </Link>
            </div>
          </div>
        </div>

        {/* Newsletter subscription */}
        <div className="border-t border-b border-border py-8 my-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-muted-foreground">
                Stay updated with the latest news and events from DDA Parks
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-l-md border border-border focus:outline-none focus:ring-2 focus:ring-dda-DEFAULT/50 w-full md:w-64"
              />
              <button className="btn-primary rounded-l-none">Subscribe</button>
            </div>
          </div>
        </div>

        {/* Copyright and bottom links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            Copyright © {currentYear} Delhi Development Authority. All rights
            reserved.
          </p>

          <div className="flex flex-wrap gap-4 text-sm">
            <Link
              href="/privacy-policy"
              className="text-muted-foreground hover:text-dda-DEFAULT transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-muted-foreground hover:text-dda-DEFAULT transition-colors duration-200"
            >
              Terms of Service
            </Link>
            <Link
              href="/accessibility"
              className="text-muted-foreground hover:text-dda-DEFAULT transition-colors duration-200"
            >
              Accessibility
            </Link>
            <Link
              href="/sitemap"
              className="text-muted-foreground hover:text-dda-DEFAULT transition-colors duration-200"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
