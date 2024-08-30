import React from "react";
import "./CafeBranches.css";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

function CafeBranches() {
  const branches = [
    {
      locationImg:
        "https://www.urbanbelly.com/perch/resources/locations/wicker-park.jpg",
      locationText: "Jalhali cross , banglore , opposite of mall".split(" "),
      mapLink:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31103.858844971255!2d77.61763445327452!3d12.972980260546453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16a418770391%3A0xb50f46b826501036!2sIndiranagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1708446659697!5m2!1sen!2sin",
      contact: "CONTACT - 9741846514",
    },
    {
      locationImg:
        "https://www.urbanbelly.com/perch/resources/locations/time-out-market.jpg",
      locationText: "Jalhali cross , banglore , opposite of mall".split(" "),
      mapLink:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31101.12907800924!2d77.55207835!3d12.994789800000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3df30cb8f5c5%3A0x4fd69ee1b53c32a!2sRajajinagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1708446333928!5m2!1sen!2sin",
      contact: "CONTACT - 9741846514",
    },
    {
      locationImg: "https://images2.alphacoders.com/488/488908.jpg",
      locationText: "Jalhali cross , banglore , opposite of mall".split(" "),
      mapLink:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.9600472268!2d77.51566457417248!3d13.03821511341618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d27a9d7c5ab%3A0xa6dcd07a66a7faf!2sJalahalli%20Cross%20Rd%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1708446611015!5m2!1sen!2sin",
      contact: "CONTACT - 9741846514",
    },
  ];

  return (
    <div className="container">
      {branches.map((branch, index) => {
        return (
          <div
            className={`row branch ${
              index % 2 === 0 ? "flex-row-reverse" : ""
            }`}
            key={index}
          >
            <div className="col-lg-6 col-md-12 branchImg">
              <img
                src={branch.locationImg}
                className="img-fluid"
                alt="branch location"
              />
            </div>
            <div className="col-lg-6 col-md-12 branchInfo">
              <h3>
                {branch.locationText.map((el, i) => (
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{
                      duration: 0.25,
                      delay: 1 + i / 6,
                    }}
                    key={i}
                    viewport={{ once: true }}
                  >
                    {el}{" "}
                  </motion.span>
                ))}
              </h3>
              <h4>{branch.contact} </h4>
              <div>
                <iframe
                  src={branch.mapLink}
                  width="100%"
                  height="200"
                  style={{ border: "0", borderRadius: "5%" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map of ${branch.locationText.join(" ")}`}
                ></iframe>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CafeBranches;
