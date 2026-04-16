"use client";

import { PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const FAQ1 = () => (
    <div
        id="faq"
        className= "w-full py-14 md:py-20 lg:py-32 bg-gradient-to-b from-yellow-50 via-white to-transparent dark:from-black dark:via-zinc-900 dark:to-transparent"
    >
        <div className="container mx-auto px-4">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

                <div className="flex flex-col gap-6">

                    <Badge variant="outline" className="w-fit">
                        FAQ
                    </Badge>

                    <div className="flex flex-col gap-4">

                        <h4 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight max-w-xl font-medium">
                            Built for teams that want control, not complexity
                        </h4>

                        <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground max-w-xl">
                            MailEngine gives you everything you need to design, send, and track
                            email campaigns without the bloat of traditional platforms.
                        </p>

                    </div>

                    <Button variant="outline" className="gap-2 w-full sm:w-auto">
                        Need help getting started? Talk to us
                        <PhoneCall className="w-4 h-4" />
                    </Button>

                </div>

                {/* RIGHT */}
                <Accordion type="single" collapsible className="w-full">

                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            How is MailEngine different from tools like Mailchimp?
                        </AccordionTrigger>
                        <AccordionContent>
                            MailEngine focuses on speed, simplicity, and full control. No bloated dashboards
                            or hidden limitations just a clean workflow to build templates, upload contacts,
                            send campaigns, and track performance in one place.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>
                            How do I create and manage email templates?
                        </AccordionTrigger>
                        <AccordionContent>
                            You can design emails using our drag-and-drop builder or upload your own custom
                            HTML templates. Whether you are technical or not, creating high quality campaigns
                            is fast and flexible.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                        <AccordionTrigger>
                            How are emails delivered reliably?
                        </AccordionTrigger>
                        <AccordionContent>
                            We use Amazon SES to handle email delivery, ensuring high deliverability,
                            scalability, and performance. That means your emails land in inboxes not spam folders.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                        <AccordionTrigger>
                            What kind of analytics do I get?
                        </AccordionTrigger>
                        <AccordionContent>
                            Track everything that matters opens, clicks, and bounces in real time.
                            MailEngine gives you clear insights so you can understand what’s working
                            and continuously improve your campaigns.
                        </AccordionContent>
                    </AccordionItem>

                </Accordion>
            </div>
        </div>
    </div>
);