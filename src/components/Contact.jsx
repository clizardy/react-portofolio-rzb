import { CONTACT } from '../constants';
import { motion } from "framer-motion";
import { RiMapPinLine, RiPhoneLine, RiMailLine } from "react-icons/ri"; 

const Contact = () => {
  return (
    <div id="contact" className='border-b border-neutral-300 dark:border-neutral-900 pb-20'>
        {/* JUDUL */}
        <motion.h2 
        whileInView={{ opacity: 1, y:  0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        className='my-10 text-center text-4xl font-bold text-amber-600 dark:text-amber-200 justify-center'>
          Get in Touch
        </motion.h2>

        {/* CONTAINER TEXT */}
        <div className="flex flex-col items-center justify-center gap-6 tracking-tighter text-neutral-700 dark:text-neutral-300">
            
            {/* 1. ALAMAT */}
            <motion.a
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 1 }}
            href="https://maps.app.goo.gl/evSzsnToVBuTjJFk9"
            target="_blank"
            rel="noopener noreferrer"
            // UBAH: Hover jadi Amber (Light) / Cyan (Dark)
            className='flex items-center gap-3 text-center hover:text-amber-600 dark:hover:text-cyan-400 transition duration-300 cursor-pointer'>
                {/* UBAH: Icon Amber (Light) / Cyan (Dark) */}
                <RiMapPinLine className="text-2xl text-amber-600 dark:text-cyan-400" />
                <p>{CONTACT.address}</p>
            </motion.a>

            {/* 2. NOMOR HP */}
            <motion.div 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 100 }}
            transition={{ duration: 1 }}
            className="flex items-center gap-3">
                {/* UBAH: Icon Amber (Light) / Cyan (Dark) */}
                <RiPhoneLine className="text-2xl text-amber-600 dark:text-cyan-400" />
                <a 
                  href={`tel:${CONTACT.phoneNo}`} 
                  // UBAH: Hover Text jadi Amber (Light)
                  className="hover:text-amber-600 dark:hover:text-cyan-400 transition duration-300">
                    {CONTACT.phoneNo}
                </a>
            </motion.div>

            {/* 3. EMAIL */}
            <motion.a
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 1 }}
            href={`mailto:${CONTACT.email}`}
            // UBAH: Border & Text Hover jadi Amber (Light)
            className="flex items-center gap-3 border-b border-neutral-400 dark:border-neutral-500 pb-1 text-neutral-700 dark:text-neutral-300 hover:text-amber-600 dark:hover:text-cyan-400 hover:border-amber-600 dark:hover:border-cyan-400 transition duration-300">
                {/* UBAH: Icon Amber (Light) / Cyan (Dark) */}
                <RiMailLine className="text-2xl text-amber-600 dark:text-cyan-400" />
                {CONTACT.email}
            </motion.a>

        </div>
    </div>
  )
}

export default Contact;