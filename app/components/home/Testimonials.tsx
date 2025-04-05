import { useI18n } from "~/contexts/I18nContext";

const testimonials = [
  {
    content: "SocialSync a complètement transformé notre stratégie de médias sociaux. Nous économisons des heures chaque semaine et notre engagement a augmenté de 40%.",
    author: "Marie Dubois",
    role: "Responsable Marketing, TechStart",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg"
  },
  {
    content: "En tant que créateur de contenu solo, SocialSync est exactement ce dont j'avais besoin. Je peux maintenant gérer toutes mes plateformes sans stress.",
    author: "Thomas Martin",
    role: "Influenceur Lifestyle",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg"
  },
  {
    content: "L'outil de génération de vidéos est incroyable ! Il nous a permis de doubler notre production de contenu avec la même équipe.",
    author: "Sophie Lefèvre",
    role: "Directrice Créative, MediaPlus",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg"
  }
];

export function Testimonials() {
  const { t } = useI18n();
  
  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-blue-600 dark:text-blue-400 tracking-wide uppercase">
            {t("testimonials.title")}
          </h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight">
            {t("app.tagline")}
          </p>
        </div>
        
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <div className="flex items-center">
                <img 
                  className="h-12 w-12 rounded-full" 
                  src={testimonial.avatar} 
                  alt={testimonial.author} 
                />
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    {testimonial.author}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                "{testimonial.content}"
              </p>
              <div className="mt-4 flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
