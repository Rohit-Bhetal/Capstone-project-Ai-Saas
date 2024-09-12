"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const testimonials = [
    {
      name: "Alice Smith",
      avatar: "A",
      title: "Product Manager",
      description: "This tool has revolutionized how we manage our projects!",
    },
    {
      name: "Michael Johnson",
      avatar: "M",
      title: "UX Designer",
      description: "Incredibly intuitive and easy to use. I highly recommend it!",
    },
    {
      name: "Sophia Brown",
      avatar: "S",
      title: "Marketing Specialist",
      description: "Our team's productivity has skyrocketed since we started using this app.",
    },
    {
      name: "David Lee",
      avatar: "D",
      title: "Data Analyst",
      description: "A powerful tool for handling data efficiently and effectively.",
    },
  ];
  

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">Testimonials</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item) => (
          <Card key={item.description} className="  bg-gradient-to-r from-[#a80024] to-[#F50202] border-none ">
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg ">{item.name}</p>
                  <p className="text-white text-sm">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0 text-white">{item.description}</CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LandingContent;