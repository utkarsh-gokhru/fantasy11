
import { FiMenu, FiArrowRight, FiX, FiChevronDown } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import {
  useMotionValueEvent,
  AnimatePresence,
  useScroll,
  motion,
} from "framer-motion";
import React, { useState } from 'react';
import useMeasure from 'react-use-measure';
import { useNavigate } from 'react-router-dom'; // Import useHistory from react-router-dom
import { getAuth, signOut } from 'firebase/auth'; // Import Firebase Auth methods


export const Navbar = () => {
    return (
      <>
        <FlyoutNav />
        {/* Removed unnecessary divs with background */}
        
      </>
    );
  };
  

  const FlyoutNav = () => {
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();
  
    useMotionValueEvent(scrollY, "change", (latest) => {
      setScrolled(latest > 250 ? true : false);
    });
  
    return (
      <nav
        className={`fixed top-0 z-50 w-full px-6 text-white 
        transition-all duration-300 ease-out lg:px-12 bg-black
        ${
          scrolled
            ? "py-3 shadow-xl"
            : "py-6 shadow-none"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Logo />
          <div className="hidden gap-6 lg:flex">
            <Links />
            <CTAs />
          </div>
          <MobileMenu />
        </div>
      </nav>
    );
  };
  
  

const Logo = ({ color = "white" }) => {
  // Temp logo from https://logoipsum.com/
  return (
    <div className="flex items-center gap-2">
      <span className="text-2xl font-bold" style={{ color }}>
        Fantasy11
      </span>
      <svg
        width="50"
        height="39"
        viewBox="0 0 50 39"
        fill={color}
        xmlns="https://www.freepik.com/free-photos-vectors/cricket-trophy"
        className="w-10"
      >
        <path
          d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
          stopColor={color}
        ></path>
        <path
          d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
          stopColor={color}
        ></path>
      </svg>
    </div>
  );
};

const Links = () => {
  return (
    <div className="flex items-center gap-6">
      {LINKS.map((l) => (
        <NavLink key={l.text} href={l.href} FlyoutContent={l.component}>
          {l.text}
        </NavLink>
      ))}
    </div>
  );
};

const NavLink = ({ children, href, FlyoutContent }) => {
  const [open, setOpen] = useState(false);

  const showFlyout = FlyoutContent && open;

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative h-fit w-fit"
    >
      <a href={href} className="relative">
        {children}
        <span
          style={{
            transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
          }}
          className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left scale-x-0 rounded-full bg-indigo-300 transition-transform duration-300 ease-out"
        />
      </a>
      <AnimatePresence>
        {showFlyout && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ translateX: "-50%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 top-12 bg-white text-black"
          >
            <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
            <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
            <FlyoutContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CTAs = () => {
  const navigate = useNavigate(); // Initialize navigate object

  const handleSignOut = async () => {
    try {
      await signOut(getAuth()); // Sign out from Firebase
      navigate('/auth'); // Redirect to auth page after signing out
    } catch (error) {
      console.error("Error signing out: ", error); // Handle any errors
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleSignOut}
        className="flex items-center gap-2 rounded-lg border-2 border-white px-4 py-2 font-semibold text-white transition-colors hover:bg-white hover:text-black"
      >
        <FaUserCircle />
        <span>Sign out</span>
      </button>
    </div>
  );
};

const AboutUsContent = () => {
  return (
    <div className="grid h-fit w-full grid-cols-12 shadow-xl lg:h-72 lg:w-[600px] lg:shadow-none xl:w-[750px]">
      <div className="col-span-12 flex flex-col justify-between bg-neutral-950 p-6 lg:col-span-4">
        <div>
          <h2 className="mb-2 text-xl font-semibold text-white"></h2>
          <p className="mb-6 max-w-xs text-sm text-neutral-400">
            How to play this exciting game !!
          </p>
        </div>
        <a
          href="/home"
          className="flex items-center gap-1 text-xs text-indigo-300 hover:underline"
        >
          Learn more <FiArrowRight />
        </a>
      </div>
      <div className="col-span-12 grid grid-cols-2 grid-rows-2 gap-3 bg-white p-6 lg:col-span-8">
        <a
          href="#"
          className="rounded border-2 border-neutral-200 bg-white p-3 transition-colors hover:bg-neutral-100"
        >
          <h3 className="mb-1 font-semibold">Batting</h3>
          <p className="text-xs  text-left">
          Earn points for runs, boundaries, and milestones like half-centuries and centuries
          </p>
        </a>
        <a
          href="#"
          className="rounded border-2 border-neutral-200 bg-white p-3 transition-colors hover:bg-neutral-100"
        >
          <h3 className="mb-1 font-semibold">Balling</h3>
          <p className="text-xs text-left">
          Gain points for wickets (excluding runouts), bonuses for specific types of dismissals
          </p>
        </a>
        <a
          href="#"
          className="rounded border-2 border-neutral-200 bg-white p-3 transition-colors hover:bg-neutral-100"
        >
          <h3 className="mb-1 font-semibold">All Rounder</h3>
          <p className="text-xs text-left">
          Reflecting performance across both disciplines
          </p>
        </a>
        <a
          href="#"
          className="rounded border-2 border-neutral-200 bg-white p-3 transition-colors hover:bg-neutral-100"
        >
          <h3 className="mb-1 font-semibold">Fielding</h3>
          <p className="text-xs">
          Score points for successful catches, stumpings, and direct hit run-outs
          </p>
        </a>
      </div>
    </div>
  );
};

const PricingContent = () => {
  return (
    <div className="w-full bg-white p-6 shadow-none lg:w-[250px] lg:shadow-xl">
      <div className="grid grid-cols-2 lg:grid-cols-1">
        <div className="mb-3 space-y-3">
          <h3 className="font-semibold">For Individuals</h3>
          <a href="#" className="block text-sm hover:underline">
            Introduction
          </a>
          <a href="#" className="block text-sm hover:underline">
            Pay as you go
          </a>
        </div>
        <div className="mb-6 space-y-3">
          <h3 className="font-semibold">For Companies</h3>
          <a href="#" className="block text-sm hover:underline">
            Startups
          </a>
          <a href="#" className="block text-sm hover:underline">
            SMBs
          </a>
          <a href="#" className="block text-sm hover:underline">
            Enterprise
          </a>
        </div>
      </div>
      <button className="w-full rounded-lg border-2 border-neutral-950 px-4 py-2 font-semibold transition-colors hover:bg-neutral-950 hover:text-white">
        Contact sales
      </button>
    </div>
  );
};

const CareersContent = () => {
  return (
    <div className="grid w-full grid-cols-12 shadow-xl lg:w-[750px]">
      <div className="col-span-12 flex flex-col justify-between bg-indigo-600 p-6 lg:col-span-4">
        <div className="mb-6">
          <h2 className="mb-2 text-xl font-semibold text-white">Exciting gift Vouchers</h2>
          <p className="text-sm text-indigo-100">
            Play the game and get a chance to win money upto 1 Cr!!
          </p>
        </div>
        <a
          href="#"
          className="flex items-center gap-1 text-xs text-indigo-200 hover:underline"
        >
          Winners List <FiArrowRight />
        </a>
      </div>
      <div className="col-span-12 grid grid-cols-2 gap-3 bg-white p-6 lg:col-span-8 lg:grid-cols-3">
        <div className="space-y-3">
          <h3 className="font-semibold">1Cr Winners</h3>
          <a href="#" className="block text-sm hover:underline">
            John Doe
          </a>
          <a href="#" className="block text-sm hover:underline">
            Nick James
          </a>
        </div>
        <div className="space-y-3">
          <h3 className="font-semibold">50L Winners</h3>
          <a href="#" className="block text-sm hover:underline">
            Rakesh Kumar
          </a>
          <a href="#" className="block text-sm hover:underline">
            Harsh Deshmukh
          </a>
          <a href="#" className="block text-sm hover:underline">
           David Miller
          </a>
         
        </div>
        <div className="space-y-3">
          <h3 className="font-semibold">More</h3>
          <a href="#" className="block text-sm hover:underline">
            Support
          </a>
          <a href="#" className="block text-sm hover:underline">
            Other
          </a>
        </div>
      </div>
    </div>
  );
};

const MobileMenuLink = ({ children, href, FoldContent, setMenuOpen }) => {
  const [ref, { height }] = useMeasure();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative text-neutral-950">
      {FoldContent ? (
        <div
          className="flex w-full cursor-pointer items-center justify-between border-b border-neutral-300 py-6 text-start text-2xl font-semibold"
          onClick={() => setOpen((pv) => !pv)}
        >
          <a
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(false);
            }}
            href={href}
          >
            {children}
          </a>
          <motion.div
            animate={{ rotate: open ? "180deg" : "0deg" }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
          >
            <FiChevronDown />
          </motion.div>
        </div>
      ) : (
        <a
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(false);
          }}
          href="#"
          className="flex w-full cursor-pointer items-center justify-between border-b border-neutral-300 py-6 text-start text-2xl font-semibold"
        >
          <span>{children}</span>
          <FiArrowRight />
        </a>
      )}
      {FoldContent && (
        <motion.div
          initial={false}
          animate={{
            height: open ? height : "0px",
            marginBottom: open ? "24px" : "0px",
            marginTop: open ? "12px" : "0px",
          }}
          className="overflow-hidden"
        >
          <div ref={ref}>
            <FoldContent />
          </div>
        </motion.div>
      )}
    </div>
  );
};

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="block lg:hidden">
      <button onClick={() => setOpen(true)} className="block text-3xl">
        <FiMenu />
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ x: "100vw" }}
            animate={{ x: 0 }}
            exit={{ x: "100vw" }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed left-0 top-0 flex h-screen w-full flex-col bg-white"
          >
            <div className="flex items-center justify-between p-6">
              <Logo color="black" />
              <button onClick={() => setOpen(false)}>
                <FiX className="text-3xl text-neutral-950" />
              </button>
            </div>
            <div className="h-screen overflow-y-scroll bg-neutral-100 p-6">
              {LINKS.map((l) => (
                <MobileMenuLink
                  key={l.text}
                  href={l.href}
                  FoldContent={l.component}
                  setMenuOpen={setOpen}
                >
                  {l.text}
                </MobileMenuLink>
              ))}
            </div>
            <div className="flex justify-end bg-neutral-950 p-6">
              <CTAs />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};



const LINKS = [
    {
      text: "Home",
      href: "/home",
      component: null, // No dropdown for Home
    },
    {
      text: "Rules",
      href: "/rules",
      component: AboutUsContent, // If you have dropdown content
    },
    {
      text: "Winners",
      href: "/winners",
      component: CareersContent, // If you have dropdown content
    },
    {
      text: "My Matches",
      href: "/mymatches",
      component: null, // No dropdown for My Matches
    },
  ];
  