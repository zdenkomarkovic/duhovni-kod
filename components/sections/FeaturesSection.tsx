import { Globe, Shield, Clock } from 'lucide-react';

const features = [
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Globalno Pokrivanje",
    description: "Putovanja u preko 150 zemalja sveta"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Sigurnost i Pouzdanost",
    description: "Licencirana agencija sa mnogo iskustva"
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "24/7 Podrška",
    description: "Uvek dostupni za vaša pitanja i potrebe"
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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