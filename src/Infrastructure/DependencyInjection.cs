﻿using Project.Application.Common.Interfaces;
using Project.Domain.Entities;
using Project.Infrastructure.Persistence;
using Project.Infrastructure.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

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

            services
            .AddDefaultIdentity<ApplicationUser>()
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<Context>();

            services.AddIdentityServer()
                .AddApiAuthorization<ApplicationUser, Context>();      

            services.AddTransient<IDateTime, DateTimeService>();

          
            services.AddAuthentication()
            .AddIdentityServerJwt();

            return services;
        }
    }
}
