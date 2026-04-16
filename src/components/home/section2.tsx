export const MetricsSection = () => (
    <div
        id="benefits"
        className="w-full py-14 md:py-20 lg:py-28 bg-[#FFD54A] dark:bg-[#00004f] text-black dark:text-white"
    >
        <div className="container mx-auto px-4">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                <div className="flex flex-col gap-2">
                    <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                        99.9% delivery rate
                    </h3>
                    <p className="text-sm text-black/70 dark:text-white/70 leading-relaxed">
                        Powered by Amazon SES for consistent, high performance email delivery at scale.
                    </p>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                        Minutes to launch
                    </h3>
                    <p className="text-sm text-black/70 dark:text-white/70 leading-relaxed">
                        Go from idea to live campaign fast with drag-and-drop templates or custom HTML.
                    </p>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                        Real-time analytics
                    </h3>
                    <p className="text-sm text-black/70 dark:text-white/70 leading-relaxed">
                        Track opens, clicks, and bounces instantly to optimize every campaign.
                    </p>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                        Built to scale
                    </h3>
                    <p className="text-sm text-black/70 dark:text-white/70 leading-relaxed">
                        Send to thousands or millions without slowing down or hitting platform limits.
                    </p>
                </div>

            </div>
        </div>
    </div>
);