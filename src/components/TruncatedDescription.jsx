import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const TruncatedDescription = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [textHeight, setTextHeight] = useState("auto");
  const fullTextRef = useRef(null);
  const maxLength = 150;
  const shouldTruncate = text.length > maxLength;
  
  const truncatedText = text.slice(0, maxLength) + '...';

  useEffect(() => {
    if (fullTextRef.current) {
      setTextHeight(fullTextRef.current.scrollHeight);
    }
  }, [text, isExpanded]);

  const textVariants = {
    collapsed: { 
      height: "4.5em", 
      overflow: "hidden" 
    },
    expanded: { 
      height: textHeight, 
      overflow: "visible" 
    }
  };

  return (
    <div className="truncated-description">
      {shouldTruncate ? (
        <>
          <motion.div
            className="text-container"
            initial="collapsed"
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={textVariants}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            data-expanded={isExpanded}
          >
            <p className="card--desc" ref={fullTextRef}>
              {isExpanded ? text : truncatedText}
            </p>
          </motion.div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="read-more-button"
            aria-expanded={isExpanded}
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        </>
      ) : (
        <p className="card--desc">{text}</p>
      )}
    </div>
  );
};

export default TruncatedDescription; 