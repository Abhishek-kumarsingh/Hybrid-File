import React, { ReactNode, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ImagesSliderProps = {
  media: { type: "image" | "video"; src: string }[];
  children?: ReactNode;
  overlay?: ReactNode;
  overlayClassName?: string;
  className?: string;
  autoplay?: boolean;
  direction?: "up" | "down";
};

const ImagesSlider: React.FC<ImagesSliderProps> = ({
  media,
  children,
  overlay,
  overlayClassName,
  className,
  autoplay = true,
  direction = "up",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadedMedia, setLoadedMedia] = useState<{ type: "image" | "video"; src: string }[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === media.length ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? media.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    loadMedia();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (video && autoplay && media[currentIndex].type === "video") {
      video.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error('Failed to play video:', error);
          handleNext();
        });

      const onVideoEnd = () => {
        handleNext();
      };

      const onVideoError = () => {
        setTimeout(() => {
          handleNext();
        }, 3000);
      };

      video.addEventListener("ended", onVideoEnd);
      video.addEventListener("error", onVideoError);

      return () => {
        video.removeEventListener("ended", onVideoEnd);
        video.removeEventListener("error", onVideoError);
      };
    }
  }, [autoplay, currentIndex, media]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (videoRef.current) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      } else {
        if (autoplay && currentIndex !== -1 && media[currentIndex].type === "video") {
          if (videoRef.current) {
            videoRef.current.play()
              .then(() => {
                setIsPlaying(true);
              })
              .catch((error) => {
                console.error('Failed to play video:', error);
                handleNext();
              });
          }
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [autoplay, currentIndex, media]);

  useEffect(() => {
    const handleScroll = () => {
      const slider = document.querySelector(".slider-container");
      if (slider) {
        const rect = slider.getBoundingClientRect();
        if (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        ) {
          if (autoplay && media[currentIndex].type === "video" && videoRef.current) {
            videoRef.current.play()
              .then(() => {
                setIsPlaying(true);
              })
              .catch((error) => {
                console.error('Failed to play video:', error);
                handleNext();
              });
          }
        } else {
          if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [autoplay, currentIndex, media]);

  useEffect(() => {
    let interval: any;

    if (autoplay && media[currentIndex].type === "image") {
      interval = setInterval(() => {
        handleNext();
      }, 5000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [autoplay, currentIndex, media]);

  const loadMedia = () => {
    setLoading(true);
    const loadPromises = media.map((item) => {
      return new Promise((resolve, reject) => {
        if (item.type === "image") {
          const img = new Image();
          img.src = item.src;
          img.onload = () => resolve(item);
          img.onerror = reject;
        } else {
          resolve(item);
        }
      });
    });

    Promise.all(loadPromises)
      .then((loadedMedia) => {
        setLoadedMedia(loadedMedia as { type: "image" | "video"; src: string }[]);
        setLoading(false);
      })
      .catch((error) => console.error("Failed to load media", error));
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play()
          .catch((error) => {
            console.error('Failed to play video:', error);
            handleNext();
          });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const slideVariants = {
    initial: {
      scale: 0,
      opacity: 0,
      rotateX: 45,
    },
    visible: {
      scale: 1,
      rotateX: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.645, 0.045, 0.355, 1.0],
      },
    },
    upExit: {
      opacity: 1,
      y: "-150%",
      transition: {
        duration: 1,
      },
    },
    downExit: {
      opacity: 1,
      y: "150%",
      transition: {
        duration: 1,
      },
    },
  };

  const areMediaLoaded = loadedMedia.length > 0;

  return (
    <div
      className={`overflow-hidden h-full w-full relative flex items-center justify-center slider-container ${className}`}
      style={{
        perspective: "1000px",
        borderRadius: "10px", // Add rounded corners
        paddingTop: "20px", // Add padding from top
      }}
    >
      {areMediaLoaded && children}
      {areMediaLoaded && overlay && (
        <div
          className={`absolute inset-0 bg-black/60 z-40 ${overlayClassName}`}
        />
      )}

      {areMediaLoaded && (
        <AnimatePresence>
          {loadedMedia[currentIndex].type === "image" ? (
            <motion.img
              key={currentIndex}
              src={loadedMedia[currentIndex].src}
              initial="initial"
              animate="visible"
              exit={direction === "up" ? "upExit" : "downExit"}
              variants={slideVariants}
              className="image h-full w-full absolute inset-0 object-cover object-center"
            />
          ) : (
            <motion.div
              key={currentIndex}
              className="video-container h-full w-full absolute inset-0"
              initial="initial"
              animate="visible"
              exit={direction === "up" ? "upExit" : "downExit"}
              variants={slideVariants}
              onClick={togglePlay}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <video
                ref={videoRef}
                src={loadedMedia[currentIndex].src}
                className="video h-full w-full object-cover object-center"
                controls={false}
              />
              {isHovered && (
                <button
                  className="absolute inset-0 flex items-center justify-center text-white z-50"
                  style={{
                  }}
                >
                  {isPlaying ? '' : ''}
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default ImagesSlider;
