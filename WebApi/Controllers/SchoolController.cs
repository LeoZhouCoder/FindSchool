using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using MongoDB.Bson;
using System.Text.RegularExpressions;

using WebApi.Mongo;
using WebApi.Models;
using WebApi.Commands;

namespace WebApi.Controllers
{
    [Route("api")]
    public class SchoolController : ControllerBase
    {
        private IRepository<School> _schoolRepository;

        public SchoolController(IRepository<School> schoolRepository)
        {
            _schoolRepository = schoolRepository;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return Content("Hello from school Api");
        }

        [HttpGet]
        public async Task<IActionResult> Init()
        {
            await _schoolRepository.Drop();

            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            using (var package = new ExcelPackage(new FileInfo("schools.xlsx")))
            {
                var sheet = package.Workbook.Worksheets["School Profile"];
                int rows = sheet.Dimension.End.Row;
                int columns = sheet.Dimension.End.Column;
                School school;
                object value;
                string key;

                for (var i = 2; i <= rows; i++)
                {
                    school = new School()
                    {
                        Id = ObjectId.GenerateNewId().ToString(),
                        IsDeleted = false
                    };

                    for (var j = 1; j <= columns; j++)
                    {
                        key = Convert.ToString(sheet.Cells[1, j].Value);
                        value = sheet.Cells[i, j].Value;
                        switch (key)
                        {
                            case "School Name":
                                school.Name = Convert.ToString(value);
                                break;
                            case "Suburb":
                                school.Suburb = Convert.ToString(value);
                                break;
                            case "State":
                                school.State = Convert.ToString(value);
                                break;
                            case "Postcode":
                                school.PostCode = Convert.ToInt16(value);
                                break;
                            case "School Sector":
                                school.Sector = Convert.ToString(value);
                                break;
                            case "School Type":
                                school.Type = Convert.ToString(value);
                                break;
                            case "Campus Type":
                                school.CampusType = Convert.ToString(value);
                                break;
                            case "School URL":
                                school.Website = Convert.ToString(value);
                                break;
                            default:
                                break;
                        }
                    }
                    await _schoolRepository.Add(school);
                }
                return Content("Finish.");
            }
        }

        /// <summary>
        /// Get search query options
        /// </summary>
        [HttpGet("getSearchOptions")]
        public async Task<List<Option>> GetSearchOptions()
        {
            var schools = await _schoolRepository.Get(x => !x.IsDeleted);

            var options = new List<Option>();

            options.Add(new Option()
            {
                Key = "sectors",
                Name = "School Sector",
                Options = schools.Select(x => x.Sector).Distinct().ToList()
            });

            options.Add(new Option()
            {
                Key = "types",
                Name = "School Type",
                Options = schools.Select(x => x.Type).Distinct().ToList()
            });

            options.Add(new Option()
            {
                Key = "states",
                Name = "State",
                Options = schools.Select(x => x.State).Distinct().ToList()
            });
            return options;
        }


        /// <summary>
        /// Get schools base on search query
        /// </summary>
        /// <param name="query"></param>
        [HttpPost("getSchools")]
        public async Task<object> GetSchools([FromBody] SearchQuery query)
        {
            Regex match = String.IsNullOrEmpty(query.Query) ? null : new Regex(query.Query);

            var selectedSchool = await _schoolRepository.Get(x => !x.IsDeleted);
            if (query.States != null)
            {
                selectedSchool = selectedSchool.Where(x => query.States.Contains(x.State));
            }

            if (query.Types != null)
            {
                selectedSchool = selectedSchool.Where(x => query.Types.Contains(x.Type));
            }

            if (query.Sectors != null)
            {
                selectedSchool = selectedSchool.Where(x => query.Sectors.Contains(x.Sector));
            }

            if (match != null)
            {
                selectedSchool = selectedSchool.Where(x => (x.Name.CaseInsensitiveContains(query.Query) || x.Suburb.CaseInsensitiveContains(query.Query)));
            }

            var total = selectedSchool.Count();
            var schools = selectedSchool.OrderBy(x=>x.State)
            .ThenBy(x=>x.Suburb)
            .ThenBy(x=>x.Sector)
            .ThenBy(x=>x.Type)
            .ThenBy(x=>x.Name)
            .Skip(query.Position)
            .Take(query.Limit)
            .Select(x =>
                new SchoolView
                {
                    Id = x.Id,
                    Name = x.Name,
                    Sector = x.Sector,
                    Type = x.Type,
                    Suburb = x.Suburb,
                    State = x.State,
                    Website = x.Website
                }).ToList();


            return new { schools, total };
        }
    }
}
