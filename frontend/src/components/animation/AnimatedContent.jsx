// import {motion} from "framer-motion";
// import { Children } from "react";
// const AnimatedContent = ({Children})=>
// {
//     return (
//         <motion.section
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className="p-4 bg-blue-500 text-white rounded-lg shadow-lg">
//             {Children}

//         </motion.section>
//     )
// }




























// // import { useRef, useEffect, useState } from "react";
// // import { useSpring, animated } from "@react-spring/web";

// // const AnimatedContent = ({
// //   children,
// //   distance = 100,
// //   direction = "vertical",
// //   reverse = false,
// //   config = { tension: 50, friction: 25 },
// //   initialOpacity = 0,
// //   animateOpacity = true,
// //   scale = 1,
// //   threshold = 0.1,
// //   delay = 0
// // }) => {
// //   const [inView, setInView] = useState(false);
// //   const ref = useRef();

// //   useEffect(() => {
// //     if (!ref.current) return;

// //     const observer = new IntersectionObserver(
// //       ([entry]) => {
// //         if (entry.isIntersecting) {
// //           observer.unobserve(ref.current);
// //           setTimeout(() => {
// //             setInView(true);
// //           }, delay);
// //         }
// //       },
// //       { threshold }
// //     );

// //     observer.observe(ref.current);

// //     return () => observer.disconnect();
// //   }, [threshold, delay]);

// //   const directions = {
// //     vertical: "Y",
// //     horizontal: "X",
// //   };

// //   const springProps = useSpring({
// //     from: {
// //       transform: `translate${directions[direction]}(${reverse ? `-${distance}px` : `${distance}px`}) scale(${scale})`,
// //       opacity: animateOpacity ? initialOpacity : 1,
// //     },
// //     to: inView
// //       ? {
// //         transform: `translate${directions[direction]}(0px) scale(1)`,
// //         opacity: 1,
// //       }
// //       : undefined,
// //     config,
// //   });

// //   return (
// //     <animated.section ref={ref} style={springProps}>
// //       {children}
// //     </animated.section>
// //   );
// // };

// // export default AnimatedContent;
