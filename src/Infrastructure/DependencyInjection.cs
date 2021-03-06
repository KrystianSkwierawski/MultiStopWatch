﻿using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Project.Application.Common.Interfaces;
using Project.Application.Common.JwtFeatures;
using Project.Infrastructure.Identity;
using Project.Infrastructure.Persistence;
using Project.Infrastructure.Services;

namespace Project.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            if (configuration.GetValue<bool>("UseInMemoryDatabase"))
            {
                services.AddDbContext<Context>(options =>
                    options.UseInMemoryDatabase("ProjectDb"));
            }
            else
            {
                services.AddDbContext<Context>(options =>
                    options.UseSqlServer(
                        configuration.GetConnectionString("DefaultConnection"),
                        b => b.MigrationsAssembly(typeof(Context).Assembly.FullName)));
            }

            services.AddScoped<IContext>(provider => provider.GetService<Context>());



            services.AddTransient<IDateTime, DateTimeService>();


            //services.ConfigureApplicationCookie(options =>
            //{
            //    options.Cookie.Name = ".AspNetCore.Identity.Application";
            //    options.ExpireTimeSpan = TimeSpan.FromDays(20);
            //    options.SlidingExpiration = true;
            //});

            services.AddIdentity<ApplicationUser, IdentityRole>(opt =>
            {
                opt.Password.RequiredLength = 3;
                opt.Password.RequireDigit = false;
                opt.Password.RequireNonAlphanumeric = false;
                opt.User.RequireUniqueEmail = true;
            })
          .AddEntityFrameworkStores<Context>();


            services.AddScoped<JwtHandler>();


            services.AddSignalR();

            return services;
        }
    }
}
