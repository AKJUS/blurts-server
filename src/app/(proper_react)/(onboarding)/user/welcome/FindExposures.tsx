/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use client";

import { useRouter } from "next/navigation";
import styles from "./FindExposures.module.scss";
import { useEffect, useState } from "react";
import { ProgressBar } from "../../../../components/client/ProgressBar";

export const FindExposures = () => {
  const [scanProgress, setScanProgress] = useState(0);
  const [scanFinished, setScanFinished] = useState(false);
  const [checkingScanProgress, setCheckingScanProgress] = useState(false);
  const router = useRouter();

  const progressSteps = 6;
  const maxProgress = 100;
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const nextProgress = scanProgress + progressSteps;
      setScanProgress(Math.min(nextProgress, maxProgress));

      if (!checkingScanProgress && !scanFinished) {
        setCheckingScanProgress(true);
        void fetch("/api/v1/user/welcome-scan/progress")
          .then((response) => response.json())
          .then((result) => {
            if (result.status && result.status === "finished") {
              setScanFinished(true);
            }
            setCheckingScanProgress(false);
          })
          .catch((_) => setCheckingScanProgress(false));
      }
    }, 1000);

    if (scanProgress >= maxProgress) {
      router.push("/user/dashboard/");
    }

    return () => clearTimeout(timeoutId);
  }, [scanProgress, router, checkingScanProgress, scanFinished]);

  return (
    <div className={styles.wrapper}>
      <ProgressBar
        label="Scanning for exposures…"
        value={scanProgress}
        maxValue={maxProgress}
      />
    </div>
  );
};
