"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { motion, Variants } from "framer-motion";
import {
  FileText,
  Eye,
  Target,
  Share2,
  Lock,
  Clock,
  UserCheck,
  Cookie,
  Baby,
  Phone,
  RefreshCw,
  LucideIcon,
  Shield,
} from "lucide-react";

export default function PrivacyPage() {
  // --- CLAY TOKENS ---
  const clayCard =
    "bg-white shadow-[8px_8px_16px_rgba(214,198,186,0.5),_-4px_-4px_12px_rgba(255,255,255,0.8)] rounded-[2rem] border border-transparent dark:bg-card dark:border-border dark:shadow-none";
  const textHeading =
    "text-[#5C4D45] dark:text-foreground font-black tracking-tight";
  const textBody =
    "text-[#9C8C84] dark:text-muted-foreground font-bold leading-relaxed";

  const iconBox =
    "w-12 h-12 rounded-[1rem] flex items-center justify-center mb-4 bg-[#FFF0E6] text-[#FF9E75] dark:bg-primary/10 dark:text-primary shadow-sm";

  // --- ANIMATION ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemUpVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  type Section = {
    icon: LucideIcon;
    title: string;
    content: React.ReactNode;
  };

  const sections: Section[] = [
    {
      icon: FileText,
      title: "1. General Information",
      content: (
        <>
          <p className="mb-4">
            This Privacy Policy ("Policy") governs the collection, use, disclosure,
            storage, and protection of personal data by <strong>Byte</strong> ("Company," "we," "us," or "our"), the operator of the Byte mobile application and associated web platforms (collectively, the "Platform").
          </p>
          <p className="mb-4">
            We respect your privacy and are committed to protecting your personal data. This Policy explains how we handle your data when you access our services, which allow users to order food for dine-in or takeaway from campus vendors.
          </p>
          <p>
            By accessing or using the Platform, you consent to the data practices described in this Policy. If you do not agree with this Policy, strictly do not use the Platform.
          </p>
        </>
      ),
    },
    {
      icon: Eye,
      title: "2. Information We Collect",
      content: (
        <>
          <p className="mb-4">We collect various types of information to provide and improve our Service.</p>

          <h3 className="font-extrabold text-[#5C4D45] dark:text-foreground mt-4 mb-2">2.1. Information You Provide to Us</h3>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li><strong>Account Information:</strong> When you register, we collect your full name, email address (institutional or personal), and mobile phone number.</li>
            <li><strong>Transaction Data:</strong> Details of orders placed, items purchased, time of transaction, and the specific Vendor involved.</li>
            <li><strong>Financial Information:</strong> While we do not store your credit/debit card numbers or UPI PINs directly, we store transaction references, payment statuses, and Wallet balance history processed through our third-party payment gateway (e.g., Cashfree).</li>
            <li><strong>Support Communications:</strong> Any information provided when you contact <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">support@byteapp.tech</span>, including screenshots or descriptions of issues.</li>
          </ul>

          <h3 className="font-extrabold text-[#5C4D45] dark:text-foreground mt-4 mb-2">2.2. Information Collected Automatically</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Device Information:</strong> We collect information about the device you use to access Byte, including the hardware model, operating system and version, unique device identifiers (IMEI/UUID), and mobile network information.</li>
            <li><strong>Log Data:</strong> Our servers automatically record details such as your IP address, browser type, access times, and pages viewed within the app.</li>
            <li><strong>Location Data:</strong> We may collect coarse location data to verify that you are within the operational campus radius, solely for the purpose of service availability.</li>
          </ul>
        </>
      ),
    },
    {
      icon: Target,
      title: "3. Purpose of Data Collection",
      content: (
        <>
          <p className="mb-4">We process your data for the following specific legal and business purposes:</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li><strong>Service Fulfillment:</strong> To relay your order details to Vendors and generate digital receipts/tokens for pickup.</li>
            <li><strong>Wallet Management:</strong> To maintain your Byte Wallet balance, process recharges, and handle automated refunds (in cases of Vendor rejection/timeout).</li>
            <li><strong>Communication:</strong> To send you transactional updates (e.g., "Order Ready" notifications), administrative notices, and security alerts.</li>
            <li><strong>Security & Fraud Prevention:</strong> To detect unauthorized account access, prevent multiple account abuse, and ensure the integrity of the Wallet system.</li>
            <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and requests from law enforcement agencies within India.</li>
          </ol>
        </>
      ),
    },
    {
      icon: Share2,
      title: "4. Disclosure of Information",
      content: (
        <>
          <p className="mb-4">We strictly do not sell your personal data to data brokers. However, we may share your data in the following circumstances:</p>

          <h3 className="font-extrabold text-[#5C4D45] dark:text-foreground mt-4 mb-2">4.1. With Vendors</h3>
          <p className="mb-4">We share your Name and Order Details with the specific Vendor fulfilling your order. Vendors are independent data controllers and use this information solely to prepare your order and verify your identity at pickup.</p>

          <h3 className="font-extrabold text-[#5C4D45] dark:text-foreground mt-4 mb-2">4.2. With Service Providers</h3>
          <p className="mb-2">We engage third-party companies to perform services on our behalf, including:</p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li><strong>Payment Processors:</strong> (e.g., Cashfree) to facilitate payments.</li>
            <li><strong>Cloud Infrastructure:</strong> (e.g., Firebase/Google Cloud) for data hosting and backend services.</li>
            <li><strong>Analytics Services:</strong> To analyze app performance and usage patterns.</li>
          </ul>

          <h3 className="font-extrabold text-[#5C4D45] dark:text-foreground mt-4 mb-2">4.3. Legal Requirements</h3>
          <p className="mb-2">We may disclose your information if required to do so by law or in the good faith belief that such action is necessary to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Comply with a legal obligation (e.g., IT Act, 2000).</li>
            <li>Protect and defend the rights or property of Byte.</li>
            <li>Prevent or investigate possible wrongdoing in connection with the Service.</li>
          </ul>
        </>
      ),
    },
    {
      icon: Lock,
      title: "5. Data Security",
      content: (
        <>
          <p className="mb-4">We employ industry-standard technical and organizational measures to secure your personal data, including:</p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li><strong>Encryption:</strong> Data in transit is encrypted using TLS/SSL protocols.</li>
            <li><strong>Access Control:</strong> Access to personal data is restricted to authorized employees and contractors who need to know that information in order to process it for us.</li>
            <li><strong>Database Security:</strong> We utilize secure cloud databases (Isar/Firebase) with strict security rules.</li>
          </ul>
          <p>
            However, please be aware that no method of transmission over the internet or method of electronic storage is 100% secure. While we strive to protect your personal data, we cannot guarantee its absolute security.
          </p>
        </>
      ),
    },
    {
      icon: Clock,
      title: "6. Data Retention",
      content: (
        <>
          <p className="mb-4">We retain your personal data only for as long as is necessary for the purposes set out in this Privacy Policy.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Account Data:</strong> Retained as long as your account is active.</li>
            <li><strong>Transaction Records:</strong> Retained for a period of minimum 7 years for tax and audit purposes, as required by Indian law.</li>
            <li><strong>Deleted Accounts:</strong> If you request account deletion, your personal identifiers are removed, but anonymized transaction data may be retained for analytics.</li>
          </ul>
        </>
      ),
    },
    {
      icon: UserCheck,
      title: "7. Your Rights",
      content: (
        <>
          <p className="mb-4">Depending on your jurisdiction, you have the following rights:</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li><strong>Right to Access:</strong> You can request a copy of the personal data we hold about you.</li>
            <li><strong>Right to Correction:</strong> You can request that we correct inaccurate or incomplete data.</li>
            <li><strong>Right to Deletion:</strong> You can request the deletion of your account via the "Delete Account" feature in the app settings or by contacting support.</li>
            <li><strong>Right to Withdraw Consent:</strong> You may withdraw consent for data processing at any time, though this will result in the termination of your ability to use the Service.</li>
          </ol>
        </>
      ),
    },
    {
      icon: Cookie,
      title: "8. Cookies and Tracking",
      content: (
        <p>
          We use cookies and similar tracking technologies (such as local storage in the app) to track the activity on our Service and store certain information, such as your login session and theme preferences ("Claymorphism" UI settings). You can instruct your browser/device to refuse all cookies, but some parts of our Service may not function properly.
        </p>
      ),
    },
    {
      icon: Baby,
      title: "9. Children's Privacy",
      content: (
        <p>
          Our Service is intended for university/college students and staff. We do not knowingly collect personally identifiable information from anyone under the age of 18 without parental consent. If we become aware that we have collected data from children without verification of parental consent, we take steps to remove that information.
        </p>
      ),
    },
    {
      icon: Shield,
      title: "10. Grievance Officer",
      content: (
        <>
          <p className="mb-4">
            In accordance with the Information Technology Act, 2000 and Rules made thereunder, the contact details of the Grievance Officer are provided below:
          </p>
          <div className="bg-white/50 dark:bg-black/20 p-6 rounded-2xl border border-[#F5EFE8] dark:border-border">
            <p className="mb-1"><strong>Name:</strong> </p>
            <p className="mb-1"><strong>Designation:</strong> Grievance Officer</p>
            <p className="mb-1"><strong>Address:</strong> Byte Operations, Vallichira, Kerala, India</p>
            <p><strong>Email:</strong> <a href="mailto:support@byteapp.tech" className="text-[#FF9E75] hover:underline">support@byteapp.tech</a></p>
          </div>
          <p className="mb-6 pt-6">
            The Grievance Officer shall acknowledge complaints within 24 hours and resolve them within 15 days from the date of receipt.
          </p>
        </>
      ),
    },
    {
      icon: RefreshCw,
      title: "11. Changes to this Privacy Policy",
      content: (
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
        </p>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFBF7] dark:bg-background selection:bg-orange-100 dark:selection:bg-primary/30 font-sans">
      <Navbar />

      <main className="py-20 mt-10 lg:py-24">
        <motion.div
          className="max-w-4xl mx-auto px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemUpVariants} className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-white dark:bg-secondary rounded-full text-[#FF9E75] dark:text-foreground font-black text-xs uppercase tracking-wider mb-6 shadow-sm border border-[#F5EFE8] dark:border-border">
              Last updated: January 21, 2026
            </div>
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl mb-6 ${textHeading}`}
            >
              Privacy Policy
            </h1>
            <p className={`text-xl max-w-2xl mx-auto ${textBody}`}>
              How we manage and protect your data at Byte.
            </p>
          </motion.div>

          {/* Policy Sections Grid */}
          <div className="space-y-8">
            {sections.map((section, idx) => (
              <motion.section
                key={idx}
                variants={itemUpVariants}
                className={`p-8 md:p-10 ${clayCard}`}
              >
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                  <div className="shrink-0">
                    <div className={iconBox}>
                      <section.icon size={24} strokeWidth={2.5} />
                    </div>
                  </div>
                  <div className="w-full">
                    <h2 className={`text-2xl mb-4 ${textHeading}`}>
                      {section.title}
                    </h2>
                    <div className={`text-sm md:text-base ${textBody}`}>
                      {section.content}
                    </div>
                  </div>
                </div>
              </motion.section>
            ))}

            {/* Contact Section */}
            <motion.section
              variants={itemUpVariants}
              className={`p-8 md:p-10 ${clayCard}`}
            >
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                <div className="shrink-0">
                  <div className={iconBox}>
                    <Phone size={24} strokeWidth={2.5} />
                  </div>
                </div>
                <div>
                  <h2 className={`text-2xl mb-4 ${textHeading}`}>Contact Us</h2>
                  <p className={`text-sm md:text-base mb-2 ${textBody}`}>
                    If you have any questions about this Privacy Policy, please
                    contact us at:
                  </p>
                  <a
                    href="mailto:support@byteapp.tech"
                    className="text-[#FF9E75] font-black hover:underline break-all dark:text-primary text-lg"
                  >
                    support@byteapp.tech
                  </a>
                </div>
              </div>
            </motion.section>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
