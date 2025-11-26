interface SearchFiltersProps {
  selectedCareer: string;
  selectedSemester: string;
  onCareerChange: (career: string) => void;
  onSemesterChange: (semester: string) => void;
}

export function SearchFilters({
  selectedCareer,
  selectedSemester,
  onCareerChange,
  onSemesterChange
}: SearchFiltersProps) {
  const careers = [
    'Todas',
    'TICS / Ingeniería en Tecnologías Computacionales',
    'Medicina',
    'Arquitectura',
    'Gestión Empresarial',
    'Psicología',
    'Ingeniería Industrial',
    'Derecho',
    'Comunicación',
    'Contabilidad',
    'BBA',
    'Estudios Liberales'
  ];

  const semesters = ['Todos', ...Array.from({ length: 18 }, (_, i) => `${i + 1}`)];

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-2">Carrera</label>
          <select
            value={selectedCareer}
            onChange={(e) => onCareerChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
          >
            {careers.map(career => (
              <option key={career} value={career}>{career}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Cuatrimestre</label>
          <select
            value={selectedSemester}
            onChange={(e) => onSemesterChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
          >
            {semesters.map(semester => (
              <option key={semester} value={semester}>{semester}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}