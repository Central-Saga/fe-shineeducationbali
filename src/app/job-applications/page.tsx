"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/ui-home/Navbar";
import Footer from "@/components/ui-home/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { DynamicBackground, FloatingBubbles } from "@/components/animations/BackgroundAnimations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";

// Available job positions
const availablePositions = [
  { id: 1, title: "Guru Bahasa Inggris", location: "Denpasar" },
  { id: 2, title: "Staff Administrasi", location: "Kuta" },
  { id: 3, title: "Guru Matematika", location: "Denpasar" },
  { id: 4, title: "Marketing Executive", location: "Kuta" },
  { id: 5, title: "IT Support", location: "Denpasar" },
  { id: 6, title: "Cleaning Service", location: "Kuta" },
];

export default function JobApplicationsPage() {
  const [activeTab, setActiveTab] = useState("apply");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    education: "",
    address: "",
    resume: null as File | null,
    coverLetter: null as File | null,
  });
  const [trackingData, setTrackingData] = useState({
    applicationId: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [trackingResult, setTrackingResult] = useState<null | {
    status: string;
    details: string;
    nextSteps: string;
    date: string;
  }>(null);
  const [trackingError, setTrackingError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user selects
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      
      // Clear error when user uploads file
      if (formErrors[name]) {
        setFormErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) errors.firstName = "Nama depan wajib diisi";
    if (!formData.lastName.trim()) errors.lastName = "Nama belakang wajib diisi";
    
    if (!formData.email.trim()) {
      errors.email = "Email wajib diisi";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Format email tidak valid";
    }
    
    if (!formData.phone.trim()) {
      errors.phone = "Nomor telepon wajib diisi";
    } else if (!/^[0-9+\-\s()]{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = "Format nomor telepon tidak valid";
    }
    
    if (!formData.position) errors.position = "Posisi wajib dipilih";
    if (!formData.experience) errors.experience = "Pengalaman wajib dipilih";
    if (!formData.education) errors.education = "Pendidikan wajib dipilih";
    if (!formData.address.trim()) errors.address = "Alamat wajib diisi";
    
    if (!formData.resume) errors.resume = "CV wajib diunggah";
    
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      
      // Simulate API request with setTimeout
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          position: "",
          experience: "",
          education: "",
          address: "",
          resume: null,
          coverLetter: null,
        });
        
        // Scroll to top to see success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Reset success message after 10 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 10000);
      }, 1500);
    }
  };

  const handleTrackingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate tracking form
    let hasError = false;
    if (!trackingData.applicationId.trim()) {
      setTrackingError("ID Aplikasi wajib diisi");
      hasError = true;
    } else if (!trackingData.email.trim()) {
      setTrackingError("Email wajib diisi");
      hasError = true;
    }
    
    if (!hasError) {
      // Simulate API request
      setTimeout(() => {
        // For demo purposes, just show a fake result if there's input
        if (trackingData.applicationId && trackingData.email) {
          setTrackingResult({
            status: "Dalam Proses Review",
            details: "Lamaran Anda sedang dalam proses review oleh tim HR kami.",
            nextSteps: "Anda akan dihubungi melalui email atau telepon jika terpilih untuk tahap wawancara.",
            date: "Diperbarui pada: 4 Juli 2025"
          });
          setTrackingError("");
        } else {
          setTrackingError("Data aplikasi tidak ditemukan");
          setTrackingResult(null);
        }
      }, 800);
    }
  };

  return (
    <main className="min-h-screen relative">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10">
        <DynamicBackground />
        <FloatingBubbles />
      </div>
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent">
                Lamaran
              </span> Kerja
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Kirim lamaran atau pantau status aplikasi Anda untuk bergabung dengan tim Shine Education.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#C40503] to-[#DAA625] mx-auto mb-10"></div>
          </motion.div>
        </div>
      </section>

      {/* Application Tabs */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs 
            defaultValue="apply" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="max-w-3xl mx-auto"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="apply">Kirim Lamaran</TabsTrigger>
              <TabsTrigger value="track">Pantau Status</TabsTrigger>
            </TabsList>
            
            {/* Apply Form Tab */}
            <TabsContent value="apply" className="mt-6">
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  <Alert className="bg-green-50 border border-green-100">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <AlertDescription className="text-green-700 font-medium">
                      Lamaran Anda berhasil dikirim! Tim kami akan meninjau lamaran Anda dan menghubungi jika terpilih untuk tahap selanjutnya.
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}
              
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Form Lamaran Kerja</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Informasi Personal
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* First Name */}
                        <div className="space-y-2">
                          <Label htmlFor="firstName">
                            Nama Depan <span className="text-[#C40503]">*</span>
                          </Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className={formErrors.firstName ? "border-red-500" : ""}
                          />
                          {formErrors.firstName && (
                            <p className="text-sm text-red-500">{formErrors.firstName}</p>
                          )}
                        </div>
                        
                        {/* Last Name */}
                        <div className="space-y-2">
                          <Label htmlFor="lastName">
                            Nama Belakang <span className="text-[#C40503]">*</span>
                          </Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className={formErrors.lastName ? "border-red-500" : ""}
                          />
                          {formErrors.lastName && (
                            <p className="text-sm text-red-500">{formErrors.lastName}</p>
                          )}
                        </div>
                        
                        {/* Email */}
                        <div className="space-y-2">
                          <Label htmlFor="email">
                            Email <span className="text-[#C40503]">*</span>
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={formErrors.email ? "border-red-500" : ""}
                          />
                          {formErrors.email && (
                            <p className="text-sm text-red-500">{formErrors.email}</p>
                          )}
                        </div>
                        
                        {/* Phone */}
                        <div className="space-y-2">
                          <Label htmlFor="phone">
                            Nomor Telepon <span className="text-[#C40503]">*</span>
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={formErrors.phone ? "border-red-500" : ""}
                          />
                          {formErrors.phone && (
                            <p className="text-sm text-red-500">{formErrors.phone}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Job Information */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Informasi Pekerjaan
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Position */}
                        <div className="space-y-2">
                          <Label htmlFor="position">
                            Posisi yang Dilamar <span className="text-[#C40503]">*</span>
                          </Label>
                          <Select 
                            value={formData.position} 
                            onValueChange={(value) => handleSelectChange("position", value)}
                          >
                            <SelectTrigger className={formErrors.position ? "border-red-500" : ""}>
                              <SelectValue placeholder="Pilih posisi" />
                            </SelectTrigger>
                            <SelectContent>
                              {availablePositions.map((position) => (
                                <SelectItem key={position.id} value={position.id.toString()}>
                                  {position.title} - {position.location}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {formErrors.position && (
                            <p className="text-sm text-red-500">{formErrors.position}</p>
                          )}
                        </div>
                        
                        {/* Experience */}
                        <div className="space-y-2">
                          <Label htmlFor="experience">
                            Pengalaman <span className="text-[#C40503]">*</span>
                          </Label>
                          <Select 
                            value={formData.experience} 
                            onValueChange={(value) => handleSelectChange("experience", value)}
                          >
                            <SelectTrigger className={formErrors.experience ? "border-red-500" : ""}>
                              <SelectValue placeholder="Pilih pengalaman" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="fresh-graduate">Fresh Graduate</SelectItem>
                              <SelectItem value="1-2">1-2 tahun</SelectItem>
                              <SelectItem value="3-5">3-5 tahun</SelectItem>
                              <SelectItem value="5-10">5-10 tahun</SelectItem>
                              <SelectItem value="10+">Lebih dari 10 tahun</SelectItem>
                            </SelectContent>
                          </Select>
                          {formErrors.experience && (
                            <p className="text-sm text-red-500">{formErrors.experience}</p>
                          )}
                        </div>
                        
                        {/* Education */}
                        <div className="space-y-2">
                          <Label htmlFor="education">
                            Pendidikan Terakhir <span className="text-[#C40503]">*</span>
                          </Label>
                          <Select 
                            value={formData.education} 
                            onValueChange={(value) => handleSelectChange("education", value)}
                          >
                            <SelectTrigger className={formErrors.education ? "border-red-500" : ""}>
                              <SelectValue placeholder="Pilih pendidikan" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sma">SMA/SMK/Sederajat</SelectItem>
                              <SelectItem value="d3">Diploma (D3)</SelectItem>
                              <SelectItem value="s1">Sarjana (S1)</SelectItem>
                              <SelectItem value="s2">Magister (S2)</SelectItem>
                              <SelectItem value="s3">Doktor (S3)</SelectItem>
                            </SelectContent>
                          </Select>
                          {formErrors.education && (
                            <p className="text-sm text-red-500">{formErrors.education}</p>
                          )}
                        </div>
                        
                        {/* Address */}
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="address">
                            Alamat Lengkap <span className="text-[#C40503]">*</span>
                          </Label>
                          <Textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            rows={3}
                            className={formErrors.address ? "border-red-500" : ""}
                          />
                          {formErrors.address && (
                            <p className="text-sm text-red-500">{formErrors.address}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Documents */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Dokumen
                      </h3>
                      
                      {/* Resume */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="resume">
                            CV/Resume <span className="text-[#C40503]">*</span>
                          </Label>
                          <div className="flex items-center gap-4">
                            <Input
                              id="resume"
                              name="resume"
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={handleFileChange}
                              className={formErrors.resume ? "border-red-500" : ""}
                            />
                            {formData.resume && (
                              <span className="text-sm text-green-600">
                                ✓ {formData.resume.name}
                              </span>
                            )}
                          </div>
                          {formErrors.resume ? (
                            <p className="text-sm text-red-500">{formErrors.resume}</p>
                          ) : (
                            <p className="text-xs text-gray-500">Format: PDF, DOC, atau DOCX (Maks. 5MB)</p>
                          )}
                        </div>
                        
                        {/* Cover Letter */}
                        <div className="space-y-2">
                          <Label htmlFor="coverLetter">
                            Surat Lamaran (Opsional)
                          </Label>
                          <div className="flex items-center gap-4">
                            <Input
                              id="coverLetter"
                              name="coverLetter"
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={handleFileChange}
                            />
                            {formData.coverLetter && (
                              <span className="text-sm text-green-600">
                                ✓ {formData.coverLetter.name}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500">Format: PDF, DOC, atau DOCX (Maks. 5MB)</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Submit Button */}
                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-[#C40503] to-[#DAA625] hover:opacity-90 text-white h-12"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Mengirim Lamaran...
                          </>
                        ) : "Kirim Lamaran"}
                      </Button>
                      <p className="text-xs text-center text-gray-500 mt-3">
                        Dengan mengirim lamaran, Anda menyetujui bahwa data Anda akan diproses sesuai dengan kebijakan privasi kami.
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </TabsContent>
            
            {/* Track Application Tab */}
            <TabsContent value="track" className="mt-6">
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Pantau Status Lamaran</h2>
                
                <form onSubmit={handleTrackingSubmit} className="space-y-6">
                  <div className="space-y-4">
                    {/* Application ID */}
                    <div className="space-y-2">
                      <Label htmlFor="applicationId">
                        ID Aplikasi <span className="text-[#C40503]">*</span>
                      </Label>
                      <Input
                        id="applicationId"
                        value={trackingData.applicationId}
                        onChange={(e) => setTrackingData(prev => ({ ...prev, applicationId: e.target.value }))}
                        placeholder="Contoh: APP123456789"
                      />
                    </div>
                    
                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="trackingEmail">
                        Email <span className="text-[#C40503]">*</span>
                      </Label>
                      <Input
                        id="trackingEmail"
                        type="email"
                        value={trackingData.email}
                        onChange={(e) => setTrackingData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="Email yang digunakan saat melamar"
                      />
                    </div>
                  </div>
                  
                  {trackingError && (
                    <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
                      {trackingError}
                    </div>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-[#C40503] to-[#DAA625] hover:opacity-90 text-white"
                  >
                    Cek Status
                  </Button>
                </form>
                
                {/* Tracking Result */}
                {trackingResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 border-t pt-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Status Lamaran
                    </h3>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center mb-4">
                        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                        <span className="font-medium">{trackingResult.status}</span>
                      </div>
                      
                      <div className="space-y-3 text-gray-600">
                        <p>{trackingResult.details}</p>
                        <p><span className="font-medium">Langkah Selanjutnya:</span> {trackingResult.nextSteps}</p>
                        <p className="text-sm text-gray-500">{trackingResult.date}</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-between items-center text-sm">
                      <span className="text-gray-600">
                        Ada pertanyaan? Hubungi kami di <span className="font-medium">recruitment@shineeducation.com</span>
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-gray-50/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              FAQ Seputar Lamaran Kerja
            </h2>
            <p className="text-gray-600">
              Pertanyaan yang sering diajukan tentang proses lamaran kerja di Shine Education
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h3 className="font-semibold text-gray-900 mb-2">
                Berapa lama proses seleksi lamaran kerja?
              </h3>
              <p className="text-gray-600">
                Proses seleksi biasanya memakan waktu 2-3 minggu tergantung pada posisi yang dilamar. Kami akan menghubungi kandidat yang lolos seleksi administrasi untuk tahap selanjutnya.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h3 className="font-semibold text-gray-900 mb-2">
                Apakah saya perlu membawa dokumen asli saat wawancara?
              </h3>
              <p className="text-gray-600">
                Ya, kami meminta kandidat untuk membawa dokumen asli seperti ijazah, sertifikat, dan kartu identitas saat proses wawancara untuk keperluan verifikasi.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h3 className="font-semibold text-gray-900 mb-2">
                Bagaimana cara mengetahui status lamaran saya?
              </h3>
              <p className="text-gray-600">
                Anda dapat menggunakan fitur "Pantau Status" dengan memasukkan ID Aplikasi dan email yang Anda gunakan saat melamar. ID Aplikasi akan dikirimkan ke email Anda setelah berhasil mengirimkan lamaran.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h3 className="font-semibold text-gray-900 mb-2">
                Apakah saya bisa melamar lebih dari satu posisi?
              </h3>
              <p className="text-gray-600">
                Ya, Anda dapat melamar untuk beberapa posisi yang berbeda. Namun, kami sarankan untuk melamar posisi yang sesuai dengan kualifikasi dan pengalaman Anda.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
