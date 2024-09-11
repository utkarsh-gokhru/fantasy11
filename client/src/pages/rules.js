import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

export const CreateRecepie = () => {
  const [open, setOpen] = useState(solutions[0].id);
  const imgSrc = solutions.find((s) => s.id === open)?.imgSrc;
  return (
    <section className="px-8 py-12 bg-white mt-12">
      <div className="w-full max-w-5xl mx-auto grid gap-8 grid-cols-1 lg:grid-cols-[1fr_350px]">
        <div>
          <h3 className="text-4xl font-bold mb-8">Rules </h3>
          <div className="flex flex-col gap-4">
            {solutions.map((q) => {
              return (
                <Solution {...q} key={q.id} open={open} setOpen={setOpen} index={q.id} />
              );
            })}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={imgSrc}
            className="bg-slate-300 rounded-2xl aspect-[4/3] lg:aspect-auto"
            style={{
              backgroundImage: `url(${imgSrc})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
        </AnimatePresence>
      </div>
    </section>
  );
};

const Solution = ({ title, description, index, open, setOpen }) => {
  const isOpen = index === open;

  return (
    <div
      onClick={() => setOpen(index)}
      className="p-0.5 rounded-lg relative overflow-hidden cursor-pointer"
    >
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "240px" : "72px",
        }}
        className="p-6 rounded-[7px] bg-white flex flex-col justify-between relative z-20"
      >
        <div>
          <motion.p
            initial={false}
            animate={{
              color: isOpen ? "rgba(0, 0, 0, 0)" : "rgba(0, 0, 0, 1)",
            }}
            className="text-xl font-medium w-fit bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text"
          >
            {title}
          </motion.p>
          <motion.p
            initial={false}
            animate={{
              opacity: isOpen ? 1 : 0,
            }}
            className="mt-4 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent"
          >
            {description}
          </motion.p>
        </div>
        <motion.button
          initial={false}
          animate={{
            opacity: isOpen ? 1 : 0,
          }}
          className="-ml-6 -mr-6 -mb-6 mt-4 py-2 rounded-b-md flex items-center justify-center gap-1 group transition-[gap] bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
        >
          <span>Learn more</span>
          <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          opacity: isOpen ? 1 : 0,
        }}
        className="absolute inset-0 z-10 bg-gradient-to-r from-violet-600 to-indigo-600"
      />
      <div className="absolute inset-0 z-0 bg-slate-200" />
    </div>
  );
};



const solutions = [
  {
    id: 1,
    title: "Batting",
    description:
      <div>
        <ul class="list-disc list-inside space-y-2">
          <li class="flex justify-between items-center"><span class="font-bold">Run:</span> <span class=" px-3 py-1 rounded-full text-sm">+1</span></li>
          <li class="flex justify-between items-center"><span class="font-bold">Boundary Bonus:</span> <span class=" px-3 py-1 rounded-full text-sm">+1</span></li>
          <li class="flex justify-between items-center"><span class="font-bold">Six Bonus:</span> <span class=" px-3 py-1 rounded-full text-sm">+2</span></li>
          <li class="flex justify-between items-center"><span class="font-bold">Half-Century Bonus:</span> <span class=" px-3 py-1 rounded-full text-sm">+8</span></li>
          <li class="flex justify-between items-center"><span class="font-bold">Century Bonus:</span> <span class=" px-3 py-1 rounded-full text-sm">+16</span></li>
          <li class="flex justify-between items-center"><span class="font-bold">Dismissal for a Duck:</span> <span class="bg-red-200 px-3 py-1 rounded-full text-sm">-2</span></li>
        </ul>
      </div>
    ,
    imgSrc:
      "https://i.pinimg.com/736x/45/d2/83/45d283e9af112aa4065c417336649ab2.jpg",
  },
  {
    id: 2,
    title: "Balling",
    description:
      <ul className="list-disc list-inside space-y-2">
        <li className="flex justify-between">
          <span className="font-bold">Wicket (Excluding Runout):</span>
          <span className=" px-2 py-1 rounded">+25</span>
        </li>
        <li className="flex justify-between">
          <span className="font-bold">Bonus (LBW/Bowled):</span>
          <span className=" px-2 py-1 rounded">+8</span>
        </li>
        <li className="flex justify-between">
          <span className="font-bold">5 Wicket Bonus:</span>
          <span className=" px-2 py-1 rounded">+16</span>
        </li>
        <li className="flex justify-between">
          <span className="font-bold">Maiden Over:</span>
          <span className=" px-2 py-1 rounded">+12</span>
        </li>
      </ul>,
    imgSrc:
      "https://i.pinimg.com/564x/ad/29/56/ad2956bedac284ce74c837f8e4a54fb9.jpg",
  },
  {
    id: 3,
    title: "Fielding",
    description:
      <ul className="list-disc list-inside space-y-2">
        <li className="flex justify-between">
          <span className="font-bold">Catch:</span>
          <span className=" px-2 py-1 rounded">+8</span>
        </li>
        <li className="flex justify-between">
          <span className="font-bold">Stumping:</span>
          <span className=" px-2 py-1 rounded">+12</span>
        </li>
        <li className="flex justify-between">
          <span className="font-bold">Run-Out (Direct Hit):</span>
          <span className=" px-2 py-1 rounded">+16</span>
        </li>

        <li className="flex justify-between">
          <span className="font-bold">Catch Miss:</span>
          <span className=" px-2 py-1 rounded text-red-500">-2</span>
        </li>
      </ul>,
    imgSrc:
      "https://i.pinimg.com/564x/da/12/9f/da129f0a3033d7bf7bdb8dd8aa830458.jpg",
  },
];