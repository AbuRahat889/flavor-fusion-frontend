import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer id="contact" className="bg-card border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <a href="#home" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-serif font-bold text-xl">F</span>
              </div>
              <span className="font-serif text-2xl font-bold text-foreground">
                Flavor<span className="text-primary">Fusion</span>
              </span>
            </a>
            <p className="text-muted-foreground">
              Experience the perfect blend of flavors with our signature gourmet burgers, 
              crafted with love and the finest ingredients.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary transition-colors group">
                <Facebook className="w-4 h-4 text-muted-foreground group-hover:text-primary-foreground" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary transition-colors group">
                <Instagram className="w-4 h-4 text-muted-foreground group-hover:text-primary-foreground" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary transition-colors group">
                <Twitter className="w-4 h-4 text-muted-foreground group-hover:text-primary-foreground" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary transition-colors group">
                <Youtube className="w-4 h-4 text-muted-foreground group-hover:text-primary-foreground" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "Menu", "About Us", "Our Chef", "Contact"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-foreground mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <span className="text-muted-foreground">
                  123 Gourmet Street,<br />
                  Food City, FC 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">hello@flavorfusion.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-0.5" />
                <span className="text-muted-foreground">
                  Mon - Fri: 10AM - 10PM<br />
                  Sat - Sun: 11AM - 11PM
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-foreground mb-4">Newsletter</h4>
            <p className="text-muted-foreground mb-4">
              Subscribe to get special offers and updates on new menu items.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
              />
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © 2024 FlavorFusion. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
