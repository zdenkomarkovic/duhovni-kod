import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const contactInfo = [
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Телефон",
    details: ["+381 63 8815544"]
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email",
    details: ["duhovni.kod@gmail.com"]
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Адреса",
    details: ["Јакшићева 19", "Крушевац, Србија"]
  }
];

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      ime: formData.get('ime'),
      prezime: formData.get('prezime'),
      email: formData.get('email'),
      telefon: formData.get('telefon'),
      message: formData.get('message')
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSubmitted(true);
        // Reset form
        (e.target as HTMLFormElement).reset();

        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        throw new Error(result.message || 'Грешка при слању поруке');
      }
    } catch (error) {
      alert('Дошло је до грешке. Молимо покушајте поново.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Контактирајте Нас
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Спремни смо да одговоримо на сва ваша питања и помогнемо вам да планирате савршену пустоловину
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Контакт Инфо */}
          <div className="space-y-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full">
                  {info.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{info.title}</h3>
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-gray-600">{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Контакт Форма */}
          <Card className="shadow-xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-6">
                {isSubmitted ? 'Порука је успешно послата!' : 'Пошаљите нам поруку'}
              </h3>
              
              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <p className="text-green-800 font-medium">Хвала вам на поруци!</p>
                    <p className="text-green-700 text-sm">Контактираћемо вас у најкраћем могућем року.</p>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="ime" className="block text-sm font-medium text-gray-700 mb-2">
                      Име *
                    </label>
                    <Input
                      id="ime"
                      name="ime"
                      placeholder="Ваше име" 
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="prezime" className="block text-sm font-medium text-gray-700 mb-2">
                      Презиме *
                    </label>
                    <Input
                      id="prezime"
                      name="prezime"
                      placeholder="Ваше презиме" 
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Емаил адреса *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="ваша@емаил.цом" 
                    required
                    disabled={isSubmitting}
                  />
                </div>
                
                <div>
                  <label htmlFor="telefon" className="block text-sm font-medium text-gray-700 mb-2">
                    Телефон
                  </label>
                  <Input 
                    id="telefon"
                    name="telefon"
                    type="tel"
                    placeholder="06x xxx xxxx" 
                    disabled={isSubmitting}
                  />
                </div>
                
                <div>
                  <label htmlFor="poruka" className="block text-sm font-medium text-gray-700 mb-2">
                    Ваша порука *
                  </label>
                  <Textarea
                    id="poruka"
                    name="message"
                    placeholder="Опишите како можемо да вам помогнемо..." 
                    rows={6}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                
                <Button 
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Шаље се...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Пошаљите поруку
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}