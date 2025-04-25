import React from "react";

const SpaMap = () => {
  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <iframe
        title="Spa Location - Bandra"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.548683601758!2d72.82643787466643!3d19.132044382082095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c996e19925ff%3A0x2f597e5d2fd4fd7f!2sBandra%20West%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1713083250219!5m2!1sen!2sin"
        width="100%"
        height="100%"
        className="border-0 rounded-xl shadow-lg"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default SpaMap;
