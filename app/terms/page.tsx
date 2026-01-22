"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { motion, Variants } from "framer-motion";
import {
    FileText,
    Server,
    UserCheck,
    CreditCard,
    ShoppingBag,
    AlertTriangle,
    ShieldAlert,
    User,
    Cpu,
    RefreshCw,
    Gavel,
    LucideIcon,
    Headphones,
} from "lucide-react";

export default function TermsPage() {
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
            title: "1. Introduction and Acceptance of Terms",
            content: (
                <>
                    <p className="mb-4">
                        These Terms and Conditions ("Terms") constitute a legally binding agreement between you ("User," "you," or "your") and <strong>Byte</strong> ("Company," "we," "us," or "our"), regarding your access to and use of the Byte mobile application, website, and related services (collectively, the "Platform").
                    </p>
                    <p>
                        By accessing, downloading, or using the Platform, you expressly acknowledge and agree to be bound by these Terms, as well as our <a href="/privacy" className="text-[#FF9E75] hover:underline">Privacy Policy</a>, <a href="/refund" className="text-[#FF9E75] hover:underline">Refund Policy</a>, and <a href="/disclaimer" className="text-[#FF9E75] hover:underline">Disclaimer</a>. If you do not agree to these Terms, you must immediately discontinue the use of the Platform.
                    </p>
                </>
            ),
        },
        {
            icon: Server,
            title: "2. Nature of Services",
            content: (
                <>
                    <p className="mb-4">
                        Byte operates as a digital intermediary connecting students and campus personnel ("Users") with independent food vendors ("Vendors") located within campus premises.
                    </p>
                    <ol className="list-decimal pl-5 space-y-2">
                        <li><strong>Platform Model:</strong> Byte is a technology platform, not a restaurant or food preparation entity. We facilitate the ordering and payment process but do not prepare, handle, or inspect food.</li>
                        <li><strong>Pickup Only:</strong> The Platform acts exclusively to facilitate <strong>takeaway and dine-in</strong> orders. We do not offer delivery services. Users are solely responsible for collecting their orders from the Vendor’s designated location.</li>
                        <li><strong>Vendor Independence:</strong> Vendors are independent business entities. They are solely responsible for the quality, safety, hygiene, and legal compliance of the food and beverages they sell.</li>
                    </ol>
                </>
            ),
        },
        {
            icon: UserCheck,
            title: "3. Eligibility and Account Registration",
            content: (
                <ol className="list-decimal pl-5 space-y-2">
                    <li><strong>Eligibility:</strong> You must be a student, faculty member, or authorized personnel of the campus where Byte operates to use the Services.</li>
                    <li><strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your login credentials. You agree to notify us immediately at <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">support@byteapp.tech</span> regarding any unauthorized use of your account.</li>
                    <li><strong>Account Termination:</strong> Byte reserves the right to suspend or terminate your account without prior notice if you violate these Terms or engage in fraudulent activity.</li>
                </ol>
            ),
        },
        {
            icon: CreditCard,
            title: "4. Wallet, Payments, and Financial Terms",
            content: (
                <>
                    <p className="mb-4">The Platform utilizes a closed-loop digital wallet system ("Byte Wallet") for all transactions.</p>

                    <h3 className="font-extrabold text-[#5C4D45] dark:text-foreground mt-4 mb-2">4.1. Wallet Recharges</h3>
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                        <li>Funds added to the Byte Wallet are <strong>non-transferable</strong> and <strong>non-refundable</strong>, except as explicitly provided in Section 4.3.</li>
                        <li>The balance in your Wallet is strictly for purchasing goods from Vendors on the Platform. It cannot be withdrawn to a bank account for casual use.</li>
                    </ul>

                    <h3 className="font-extrabold text-[#5C4D45] dark:text-foreground mt-4 mb-2">4.2. Payment Processing</h3>
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                        <li>We utilize third-party payment gateways (e.g., Cashfree) to process wallet recharges. By using the Platform, you agree to be bound by the terms and conditions of these third-party providers.</li>
                    </ul>

                    <h3 className="font-extrabold text-[#5C4D45] dark:text-foreground mt-4 mb-2">4.3. Emergency Withdrawals</h3>
                    <p className="mb-2">Notwithstanding the non-refundable nature of the Wallet, Byte may, at its sole discretion, process manual refunds to a source bank account under the following strict conditions:</p>
                    <ol className="list-decimal pl-5 space-y-2">
                        <li>The User submits a formal request due to a verifiable emergency.</li>
                        <li>The wallet balance exceeds <strong>₹5,000</strong>.</li>
                        <li>The request is approved by Byte Administration.</li>
                        <li>Approved refunds are processed within <strong>5-7 business days</strong> and may be subject to processing fees deducted by the payment gateway.</li>
                    </ol>
                </>
            ),
        },
        {
            icon: ShoppingBag,
            title: "5. Orders and Cancellations",
            content: (
                <>
                    <h3 className="font-extrabold text-[#5C4D45] dark:text-foreground mt-4 mb-2">5.1. Order Acceptance</h3>
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                        <li>Placement of an order does not guarantee acceptance. Vendors have the discretion to accept or reject orders based on availability.</li>
                        <li><strong>Automated Timeout:</strong> If a Vendor does not accept an order within <strong>7 minutes</strong> of placement, the order will be automatically cancelled.</li>
                    </ul>

                    <h3 className="font-extrabold text-[#5C4D45] dark:text-foreground mt-4 mb-2">5.2. Refund Logic</h3>
                    <p className="mb-4">In the event of a Vendor Timeout, Vendor Rejection, or Vendor Cancellation (post-acceptance), funds held in your "Reserved Balance" will be <strong>instantly and automatically</strong> refunded to your Byte Wallet.</p>

                    <h3 className="font-extrabold text-[#5C4D45] dark:text-foreground mt-4 mb-2">5.3. User Cancellations</h3>
                    <p>Once an order is accepted by the Vendor and enters the "Preparing" state, it cannot be cancelled or refunded by the User.</p>
                </>
            ),
        },
        {
            icon: AlertTriangle,
            title: "6. Returns and Disputes",
            content: (
                <>
                    <h3 className="font-extrabold text-[#5C4D45] dark:text-foreground mt-4 mb-2">6.1. No Return Policy</h3>
                    <p className="mb-4">As the goods sold are perishable food items, Byte maintains a strict <strong>No Returns</strong> policy. We do not accept returns on behalf of Vendors.</p>

                    <h3 className="font-extrabold text-[#5C4D45] dark:text-foreground mt-4 mb-2">6.2. Food Quality Disputes</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Byte is not liable for the taste, appearance, nutritional content, or quality of the food.</li>
                        <li>Any complaints regarding food quality, portion size, or foreign objects must be raised directly with the Vendor at the time of pickup.</li>
                        <li>While Byte may mediate serious disputes at its discretion, the Vendor retains final authority over replacements or compensations.</li>
                    </ul>
                </>
            ),
        },
        {
            icon: ShieldAlert,
            title: "7. Limitation of Liability",
            content: (
                <>
                    <p className="mb-4">To the fullest extent permitted by applicable law:</p>
                    <ol className="list-decimal pl-5 space-y-2">
                        <li><strong>Service Availability:</strong> Byte does not guarantee that the Platform will be uninterrupted, error-free, or free from viruses or other harmful components.</li>
                        <li><strong>Indirect Damages:</strong> Byte shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or goodwill, arising from your use of the Platform.</li>
                        <li><strong>Third-Party Actions:</strong> Byte is not liable for the acts, errors, omissions, representations, warranties, breaches, or negligence of any Vendor or for any personal injuries, death, property damage, or other damages or expenses resulting there from.</li>
                    </ol>
                </>
            ),
        },
        {
            icon: User,
            title: "8. User Conduct",
            content: (
                <>
                    <p className="mb-4">You agree not to:</p>
                    <ol className="list-decimal pl-5 space-y-2">
                        <li>Use the Platform for any unlawful purpose.</li>
                        <li>Attempt to gain unauthorized access to the Platform’s backend, servers, or other user accounts.</li>
                        <li>Harass, threaten, or abuse Vendors or Byte support staff.</li>
                        <li>Place fake orders or otherwise disrupt the operations of Vendors.</li>
                    </ol>
                </>
            ),
        },
        {
            icon: Cpu,
            title: "9. Intellectual Property",
            content: (
                <p>
                    All content, design, graphics, code, and interfaces on the Platform (including the Byte logo and "Claymorphism" UI elements) are the property of Byte and are protected by intellectual property laws. You may not copy, modify, distribute, or reverse engineer any part of the Platform without our prior written consent.
                </p>
            ),
        },
        {
            icon: RefreshCw,
            title: "10. Modifications to Terms",
            content: (
                <p>
                    Byte reserves the right to modify these Terms at any time. We will notify users of significant changes by updating the "Last Updated" date at the top of this document or through an in-app notification. Your continued use of the Platform constitutes acceptance of the modified Terms.
                </p>
            ),
        },
        {
            icon: Gavel,
            title: "11. Governing Law and Dispute Resolution",
            content: (
                <>
                    <p className="mb-4">These Terms shall be governed by and construed in accordance with the laws of <strong>India</strong>.</p>
                    <p>Any dispute, controversy, or claim arising out of or relating to these Terms, or the breach, termination, or invalidity thereof, shall be settled by arbitration or the competent courts located in <strong>Kerala, India</strong>.</p>
                </>
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
                            Last updated: January 2026
                        </div>
                        <h1
                            className={`text-4xl md:text-5xl lg:text-6xl mb-6 ${textHeading}`}
                        >
                            Terms of Service
                        </h1>
                        <p className={`text-xl max-w-2xl mx-auto ${textBody}`}>
                            Rules and regulations for the use of Byte's Platform.
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
                                        <Headphones size={24} strokeWidth={2.5} />
                                    </div>
                                </div>
                                <div>
                                    <h2 className={`text-2xl mb-4 ${textHeading}`}>12. Contact Information</h2>
                                    <p className={`text-sm md:text-base mb-2 ${textBody}`}>
                                        If you have any questions regarding these Terms and Conditions, please contact us at:
                                    </p>
                                    <div className="mt-4">
                                        <div className="font-bold text-[#5C4D45] dark:text-foreground">Byte Support</div>
                                        <a
                                            href="mailto:support@byteapp.tech"
                                            className="text-[#FF9E75] font-black hover:underline break-all dark:text-primary text-lg"
                                        >
                                            support@byteapp.tech
                                        </a>
                                    </div>
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
