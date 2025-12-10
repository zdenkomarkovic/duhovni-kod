import { Church, Users, Heart, BookOpen } from 'lucide-react';

const features = [
  {
    icon: <Church className="w-6 h-6" />,
    title: "Poseta svetinjama",
    description: "Dečani, Gračanica, Pećka Patrijaršija i druge znamenitosti"
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Stručno vođenje",
    description: "Iskusni vodiči sa dubokim poznavanjem istorije i kulture"
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Duhovno iskustvo",
    description: "Više od turizma - putovanje kroz vekove vere i tradicije"
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Priče iz istorije",
    description: "Saznajte priče koje ne piše u knjigama od stručnih vodiča"
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Zašto baš mi?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Otkrijte šta nas čini posebnim u organizaciji duhovnih putovanja
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}