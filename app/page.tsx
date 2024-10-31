import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Target, Zap, GitCompareArrows, ArrowRight } from "lucide-react";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        <div className="container mx-auto px-4 pt-24 pb-16 grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center bg-green-50 text-green-600 px-4 py-2 rounded-full text-sm font-medium">
              <Zap className="mr-2" size={16} />
              Personalized Nutrition Intelligence
            </div>
            <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
              Transform Your Health
              <br />
              <span className="text-green-600">Effortlessly</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-md">
              Intelligent meal planning and nutrition tracking powered by
              advanced AI technology.
            </p>

            <div className="flex space-x-4">
              <Link href="/dashboard">
                <Button size="lg" className="group">
                  Start Your Journey
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Explore Features
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="hidden md:block relative">
            <img
              src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=1010&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Healthy Nutrition Meal Preparation"
              className="rounded-2xl shadow-2xl object-cover h-[500px] w-full"
            />
            <div className="absolute -bottom-6 -right-6 bg-white shadow-lg rounded-xl p-4 flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Target className="text-green-600" size={24} />
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  Precision Tracking
                </p>
                <p className="text-sm text-gray-600">
                  Real-time nutritional insights
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How NutriPlan Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Cutting-edge technology meets personalized nutrition science
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: GitCompareArrows,
                title: "Smart Analysis",
                description:
                  "Advanced AI algorithms analyze your unique health profile and goals.",
                color: "text-blue-500",
              },
              {
                icon: Target,
                title: "Personalized Planning",
                description:
                  "Receive custom meal plans and nutritional recommendations.",
                color: "text-green-500",
              },
              {
                icon: Zap,
                title: "Continuous Optimization",
                description:
                  "Real-time tracking and adaptive suggestions for optimal health.",
                color: "text-purple-500",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-xl transition-all duration-300 group"
              >
                <feature.icon
                  className={`${feature.color} mb-4 group-hover:scale-110 transition`}
                  size={48}
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced CTA Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-green-500 to-blue-600 rounded-xl overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-2 items-center">
              {/* CTA Content */}
              <div className="p-12 text-white">
                <h2 className="text-4xl font-bold mb-4">
                  Your Nutrition, Reimagined
                </h2>
                <p className="text-xl mb-6 opacity-90">
                  Experience the future of personalized nutrition with our
                  AI-driven platform.
                </p>
                <div className="flex space-x-4">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-white text-green-600 hover:bg-gray-200"
                  >
                    Start Free Trial
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/20 bg-white/24"
                  >
                    Learn More
                  </Button>
                </div>
              </div>

              {/* Visual Element */}
              <div className="hidden md:block p-8">
                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-md">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="bg-white/20 p-3 rounded-full">
                      <Zap className="text-white" size={24} />
                    </div>
                    <p className="text-white font-medium">
                      Intelligent Nutrition Tracking
                    </p>
                  </div>
                  <div className="h-32 bg-white/10 rounded-xl animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
