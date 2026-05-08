"use client";

import { Check, Minus, X } from "lucide-react";
import { useScroll, useTransform } from "motion/react";
import * as motion from "motion/react-client";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { useRef } from "react";

import { cn } from "@/shared/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";

interface ContentStepProps {
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
}

function ContentStep({
  title,
  description,
  children,
  className,
}: ContentStepProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 0.9", "0 0.2"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const filter = useTransform(
    scrollYProgress,
    [0, 1],
    ["blur(12px)", "blur(0px)"],
  );

  return (
    <motion.div
      ref={ref}
      style={{ opacity, filter }}
      className={cn(
        "h-screen w-full max-w-5xl px-4 md:px-8 flex flex-col justify-center",
        className,
      )}
    >
      <Card className="bg-background/80 backdrop-blur-xl border-white/10 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-4xl md:text-2xl">{title}</CardTitle>
          <CardDescription className="md:text-lg">
            {description}
          </CardDescription>
        </CardHeader>
        {children && (
          <CardContent className="overflow-x-auto">{children}</CardContent>
        )}
      </Card>
    </motion.div>
  );
}

export function LandingShowcase() {
  const t = useTranslations("Landing.Comparison");

  const CONTENT_STEPS = 2;
  const SCREENS = CONTENT_STEPS + 3;
  const FRACTIONS = SCREENS + 1;

  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const videoScale = useTransform(
    scrollYProgress,
    [1 / FRACTIONS, 2 / FRACTIONS],
    [0.5, 1],
  );
  const videoBorderRadius = useTransform(
    scrollYProgress,
    [1 / FRACTIONS, 2 / FRACTIONS],
    ["100%", "0px"],
  );
  const overlayOpacity = useTransform(
    scrollYProgress,
    [
      2 / FRACTIONS,
      3 / FRACTIONS,
      (FRACTIONS - 2) / FRACTIONS,
      (FRACTIONS - 1) / FRACTIONS,
    ],
    [0, 1, 1, 0],
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${SCREENS * 100}svh` }}
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center">
        <motion.div
          style={{
            scale: videoScale,
            borderRadius: videoBorderRadius,
          }}
          className="relative w-full h-full bg-black shadow-2xl origin-center overflow-hidden"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-full h-full object-cover"
          >
            <source src="/assets/demo.mp4" type="video/mp4" />
          </video>

          <motion.div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-black/80 backdrop-blur-xs"
          />
        </motion.div>
      </div>

      <div className="absolute top-[200vh] w-full z-10 flex flex-col items-center pb-32">
        <ContentStep title={t("why_title")} description={t("why_desc")}>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-lg w-1/3">
                  {t("headers.analog")}
                </TableHead>
                <TableHead className="text-lg w-1/3">
                  {t("headers.drawback")}
                </TableHead>
                <TableHead className="text-lg w-1/3">
                  {t("headers.advantage")}
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Excalidraw</TableCell>
                <TableCell>
                  <X className="inline text-red-500" />{" "}
                  {t("excalidraw.drawback")}
                </TableCell>
                <TableCell>
                  <Check className="inline text-green-500" />{" "}
                  {t("excalidraw.advantage")}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">Draw.io</TableCell>
                <TableCell>
                  <X className="inline text-red-500" /> {t("drawio.drawback")}
                </TableCell>
                <TableCell>
                  <Check className="inline text-green-500" />{" "}
                  {t("drawio.advantage")}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">Figma</TableCell>
                <TableCell>
                  <X className="inline text-red-500" /> {t("figma.drawback")}
                </TableCell>
                <TableCell>
                  <Check className="inline text-green-500" />{" "}
                  {t("figma.advantage")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </ContentStep>

        <ContentStep title={t("doubt_title")} description={t("doubt_desc")}>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-lg w-1/5">
                  {t("col_feature")}
                </TableHead>
                <TableHead className="text-lg w-1/5 text-center">
                  Power Paint
                </TableHead>
                <TableHead className="text-lg w-1/5 text-center">
                  Excalidraw
                </TableHead>
                <TableHead className="text-lg w-1/5 text-center">
                  Draw.io
                </TableHead>
                <TableHead className="text-lg w-1/5 text-center">
                  Figma
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  {t("features.quick_sketches")}
                </TableCell>
                <TableCell className="text-center">
                  <Check className="inline text-green-500" />
                </TableCell>
                <TableCell className="text-center">
                  <Check className="inline text-green-500" />
                </TableCell>
                <TableCell className="text-center">
                  <Minus className="inline text-yellow-500" />
                </TableCell>
                <TableCell className="text-center">
                  <Minus className="inline text-yellow-500" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {t("features.real_time")}
                </TableCell>
                <TableCell className="text-center">
                  <Check className="inline text-green-500" />
                </TableCell>
                <TableCell className="text-center">
                  <Check className="inline text-green-500" />
                </TableCell>
                <TableCell className="text-center">
                  <Minus className="inline text-yellow-500" />
                </TableCell>
                <TableCell className="text-center">
                  <Check className="inline text-green-500" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {t("features.distributed")}
                </TableCell>
                <TableCell className="text-center">
                  <Check className="inline text-green-500" />
                </TableCell>
                <TableCell className="text-center">
                  <Minus className="inline text-yellow-500" />
                </TableCell>
                <TableCell className="text-center">
                  <Minus className="inline text-yellow-500" />
                </TableCell>
                <TableCell className="text-center">
                  <Check className="inline text-green-500" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {t("features.access_control")}
                </TableCell>
                <TableCell className="text-center">
                  <Check className="inline text-green-500" />
                </TableCell>
                <TableCell className="text-center">
                  <Minus className="inline text-yellow-500" />
                </TableCell>
                <TableCell className="text-center">
                  <Minus className="inline text-yellow-500" />
                </TableCell>
                <TableCell className="text-center">
                  <Check className="inline text-green-500" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {t("features.self_hosted")}
                </TableCell>
                <TableCell className="text-center">
                  <Check className="inline text-green-500" />
                </TableCell>
                <TableCell className="text-center">
                  <Check className="inline text-green-500" />
                </TableCell>
                <TableCell className="text-center">
                  <Check className="inline text-green-500" />
                </TableCell>
                <TableCell className="text-center">
                  <X className="inline text-red-500" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {t("features.education")}
                </TableCell>
                <TableCell className="text-center">
                  <Check className="inline text-green-500" />
                </TableCell>
                <TableCell className="text-center">
                  <Check className="inline text-green-500" />
                </TableCell>
                <TableCell className="text-center">
                  <Minus className="inline text-yellow-500" />
                </TableCell>
                <TableCell className="text-center">
                  <Minus className="inline text-yellow-500" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  {t("features.brainstorming")}
                </TableCell>
                <TableCell className="text-center">
                  <Check className="inline text-green-500" />
                </TableCell>
                <TableCell className="text-center">
                  <Check className="inline text-green-500" />
                </TableCell>
                <TableCell className="text-center">
                  <Minus className="inline text-yellow-500" />
                </TableCell>
                <TableCell className="text-center">
                  <Minus className="inline text-yellow-500" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </ContentStep>
      </div>
    </div>
  );
}
